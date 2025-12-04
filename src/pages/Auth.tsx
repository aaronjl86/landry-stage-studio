import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Header } from "@/components/landing/Header";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { z } from "zod";

// Input validation schemas
const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address').max(255, 'Email too long'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password too long'),
  fullName: z.string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name too long'),
});

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').max(255, 'Email too long'),
  password: z.string().min(1, 'Password is required').max(72, 'Password too long'),
});

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Check for both custom mode parameter and Supabase's recovery type
  const isResetMode = searchParams.get("mode") === "reset" || searchParams.get("type") === "recovery";
  // Check URL for signup mode
  const isSignupMode = searchParams.get("mode") === "signup";
  const [isLogin, setIsLogin] = useState(!isSignupMode);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [deviceFingerprint, setDeviceFingerprint] = useState<string>("");

  // Recovery state handling
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [isCheckingRecovery, setIsCheckingRecovery] = useState(false);

  // Initialize device fingerprint on mount
  useEffect(() => {
    const initFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setDeviceFingerprint(result.visitorId);
      } catch (error) {
        console.error('Fingerprint init failed:', error);
      }
    };
    initFingerprint();
  }, []);

  // Bootstrap recovery session when arriving from email link
  useEffect(() => {
    const bootstrapRecovery = async () => {
      if (!(searchParams.get("type") === "recovery" || searchParams.get("mode") === "reset")) {
        setHasRecoverySession(false);
        setRecoveryError(null);
        return;
      }

      setIsCheckingRecovery(true);
      setRecoveryError(null);

      try {
        // Try supported flows in order
        const code = searchParams.get("code");
        const tokenHash = searchParams.get("token_hash");
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (searchParams.get("type") === "recovery" && tokenHash) {
          const { error } = await supabase.auth.verifyOtp({ type: "recovery", token_hash: tokenHash });
          if (error) throw error;
        }

        // Confirm we now have a session
        const { data: { session } } = await supabase.auth.getSession();
        const ok = !!session;
        setHasRecoverySession(ok);

        // Clean sensitive params from URL
        const url = new URL(window.location.href);
        url.hash = "";
        const qs = new URLSearchParams(url.search);
        ["code", "token_hash", "error_code", "error_description"].forEach(k => qs.delete(k));
        url.search = qs.toString() ? `?${qs.toString()}` : "";
        window.history.replaceState({}, "", url.toString());

        if (!ok) {
          setRecoveryError("This reset link has expired or is invalid. Please request a new link.");
        }
      } catch (err: any) {
        setHasRecoverySession(false);
        setRecoveryError("This reset link has expired or is invalid. Please request a new link.");
      } finally {
        setIsCheckingRecovery(false);
      }
    };

    bootstrapRecovery();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:118',message:'handleSubmit called',data:{isLogin,hasEmail:!!email,hasPassword:!!password,hasFullName:!!fullName,deviceFingerprint:deviceFingerprint||'none',supabaseIsNull:!supabase},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    e.preventDefault();
    
    if (!supabase) {
      toast.error("Configuration error: Supabase client not initialized. Please check your environment variables.");
      return;
    }
    
    setLoading(true);

    try {
      if (isLogin) {
        // Validate login input
        const validationResult = loginSchema.safeParse({ email, password });
        if (!validationResult.success) {
          const firstError = validationResult.error.errors[0];
          toast.error(firstError.message);
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:140',message:'Starting signup flow',data:{email,hasPassword:!!password,fullName,deviceFingerprint:deviceFingerprint||'none'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        // Validate signup input
        const validationResult = signupSchema.safeParse({ 
          email, 
          password, 
          fullName 
        });
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:147',message:'Validation result',data:{valid:validationResult.success,errors:validationResult.success?[]:validationResult.error.errors.map(e=>e.message)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        if (!validationResult.success) {
          const firstError = validationResult.error.errors[0];
          toast.error(firstError.message);
          setLoading(false);
          return;
        }

        // Pre-validate signup to check for abuse patterns (optional - proceed if it fails)
        // Note: functions.invoke() returns { data, error } - it doesn't throw for HTTP errors
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:169',message:'Calling validate-signup',data:{email,hasFingerprint:!!deviceFingerprint},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        let abuseValidation: any = null;
        let validationError: any = null;
        
        try {
          const result = await supabase.functions.invoke('validate-signup', {
            body: {
              email,
              deviceFingerprint,
            }
          });
          
          // functions.invoke() returns { data, error } - check error explicitly
          // HTTP errors (403, 500, etc.) appear in result.error, not as exceptions
          if (result.error) {
            validationError = result.error;
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:178',message:'validate-signup returned error',data:{error:result.error.message,status:result.error.status,name:result.error.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
            // #endregion
          } else {
            abuseValidation = result.data;
          }
        } catch (err) {
          // Only catches network errors, timeouts, or actual exceptions (not HTTP errors)
          validationError = err;
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:186',message:'validate-signup exception caught',data:{error:err instanceof Error?err.message:String(err)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
          // #endregion
        }
        
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:192',message:'validate-signup final state',data:{hasError:!!validationError,errorMessage:validationError?.message,errorStatus:validationError?.status,hasData:!!abuseValidation,allowed:abuseValidation?.allowed,riskScore:abuseValidation?.risk_score,message:abuseValidation?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion

        // Only block signup if validation explicitly says not allowed
        // If validation service is down, returns error (403, 500, etc.), or times out, proceed with signup
        // This makes validate-signup truly optional - it's a safety check, not a requirement
        if (!validationError && abuseValidation && !abuseValidation.allowed) {
          toast.error(abuseValidation.message || "Signup not allowed. Please contact support if you believe this is an error.");
          setLoading(false);
          return;
        }
        
        // Log if validation failed but we're continuing anyway
        if (validationError) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:203',message:'validate-signup failed, proceeding with signup anyway',data:{error:validationError.message||String(validationError),status:validationError.status},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
          // #endregion
        }

        if (abuseValidation?.requires_verification) {
          toast.warning("Your account requires additional verification.");
        }

        // Proceed with signup, pass metadata
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:179',message:'Calling supabase.auth.signUp',data:{email,hasPassword:!!password,fullName},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        // Build signup options - only include redirect if we have a valid origin
        const signupOptions: any = {
          data: {
            full_name: fullName,
            device_fingerprint: deviceFingerprint,
          },
        };
        
        // Only add emailRedirectTo if we have a valid origin (helps avoid 422 errors)
        // If email confirmations are disabled, this won't be used anyway
        if (window.location.origin && window.location.origin !== 'null') {
          signupOptions.emailRedirectTo = `${window.location.origin}/dashboard`;
        }
        
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:204',message:'About to call signUp',data:{email,redirectUrl:signupOptions.emailRedirectTo||'none',hasPassword:!!password,passwordLength:password.length,fullName},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        const { data: signupData, error } = await supabase.auth.signUp({
          email,
          password,
          options: signupOptions,
        });
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:190',message:'signUp response',data:{hasError:!!error,error:error?.message,errorStatus:error?.status,errorDetails:error,hasUser:!!signupData?.user,userId:signupData?.user?.id,emailConfirmed:!!signupData?.user?.email_confirmed_at},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        
        if (error) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:228',message:'signUp error details',data:{errorMessage:error.message,errorStatus:error.status,errorName:error.name,fullError:JSON.stringify(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
          // #endregion
          
          // Provide more helpful error messages for common issues
          if (error.status === 422) {
            const helpfulMessage = error.message.includes('redirect') 
              ? "Signup failed: Redirect URL not whitelisted. Please contact support or check Supabase settings."
              : error.message.includes('email') 
              ? "Signup failed: Email confirmation may be required. Please check your email or contact support."
              : error.message || "Signup failed. Please check your information and try again.";
            throw new Error(helpfulMessage);
          }
          
          throw error;
        }
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:195',message:'Signup successful, navigating',data:{userId:signupData?.user?.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        toast.success("Account created! Welcome to The Landry Method!");
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:198',message:'Error caught in handleSubmit',data:{error:error instanceof Error?error.message:String(error),isError:error instanceof Error,errorName:error instanceof Error?error.name:'unknown'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    } finally {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:202',message:'handleSubmit finally block',data:{loading},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
      // #endregion
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth?type=recovery`,
      });

      if (error) throw error;

      toast.success("Password reset link sent! Check your email.");
      setIsForgotPassword(false);
      setResetEmail("");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setRecoveryError("Your reset link is missing or expired. Please request a new link.");
        toast.error("Reset link invalid or expired. Please request a new link.");
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast.success("Password updated successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <Card>
            {isResetMode ? (
              // Reset Password Mode
              <>
                <CardHeader>
                  <CardTitle>
                    {isCheckingRecovery
                      ? "Checking reset link..."
                      : hasRecoverySession
                        ? "Set New Password"
                        : "Reset Link Invalid or Expired"}
                  </CardTitle>
                  <CardDescription>
                    {isCheckingRecovery
                      ? "Please wait while we validate your reset link."
                      : hasRecoverySession
                        ? "Enter your new password below"
                        : (recoveryError || "This reset link is invalid or has expired. You can request a new one below.")}
                  </CardDescription>
                </CardHeader>

                {isCheckingRecovery ? null : hasRecoverySession ? (
                  <form onSubmit={handleUpdatePassword}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          placeholder="••••••••"
                          minLength={6}
                          autoComplete="new-password"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          placeholder="••••••••"
                          minLength={6}
                          autoComplete="new-password"
                        />
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Updating..." : "Update Password"}
                      </Button>
                    </CardFooter>
                  </form>
                ) : (
                  <form onSubmit={handlePasswordReset}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="resetEmail">Email</Label>
                        <Input
                          id="resetEmail"
                          type="email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          required
                          placeholder="you@example.com"
                          autoComplete="email"
                        />
                      </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4">
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Sending..." : "Send New Reset Link"}
                      </Button>

                      <button
                        type="button"
                        onClick={() => navigate("/auth")}
                        className="text-sm text-muted-foreground hover:bg-gradient-to-r hover:from-[hsl(280,70%,70%)] hover:via-[hsl(265,65%,55%)] hover:to-[hsl(290,75%,65%)] hover:bg-clip-text hover:text-transparent transition-colors"
                      >
                        Back to Sign In
                      </button>
                    </CardFooter>
                  </form>
                )}
              </>
            ) : isForgotPassword ? (
              // Forgot Password Mode
              <>
                <CardHeader>
                  <CardTitle>Reset Password</CardTitle>
                  <CardDescription>
                    Enter your email and we'll send you a reset link
                  </CardDescription>
                </CardHeader>

                <form onSubmit={handlePasswordReset}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resetEmail">Email</Label>
                      <Input
                        id="resetEmail"
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Sending..." : "Send Reset Link"}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="text-sm text-muted-foreground hover:bg-gradient-to-r hover:from-[hsl(280,70%,70%)] hover:via-[hsl(265,65%,55%)] hover:to-[hsl(290,75%,65%)] hover:bg-clip-text hover:text-transparent transition-colors"
                    >
                      Back to Sign In
                    </button>
                  </CardFooter>
                </form>
              </>
            ) : (
              // Normal Sign In/Sign Up Mode
              <>
                <CardHeader>
                  <CardTitle>{isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
                  <CardDescription>
                    {isLogin
                      ? "Sign in to access your dashboard"
                      : "Get 3 free uploads when you sign up"}
                  </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    {!isLogin && (
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required={!isLogin}
                          placeholder="John Doe"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        minLength={6}
                        autoComplete={isLogin ? "current-password" : "new-password"}
                      />
                      {isLogin && (
                        <button
                          type="button"
                          onClick={() => setIsForgotPassword(true)}
                          className="text-xs text-muted-foreground hover:bg-gradient-to-r hover:from-[hsl(280,70%,70%)] hover:via-[hsl(265,65%,55%)] hover:to-[hsl(290,75%,65%)] hover:bg-clip-text hover:text-transparent transition-colors"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-4">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading}
                      onClick={() => {
                        // #region agent log
                        fetch('http://127.0.0.1:7242/ingest/a9be2eb1-769f-4a1f-863d-5c5dac6908cc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Auth.tsx:469',message:'Submit button clicked',data:{isLogin,loading,hasEmail:!!email,hasPassword:!!password,hasFullName:!!fullName},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
                        // #endregion
                      }}
                    >
                      {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-muted-foreground hover:text-primary underline transition-colors mt-2"
                    >
                      {isLogin
                        ? "Don't have an account? Sign up"
                        : "Already have an account? Sign in"}
                    </button>
                  </CardFooter>
                </form>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
