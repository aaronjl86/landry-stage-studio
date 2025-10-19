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

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [deviceFingerprint, setDeviceFingerprint] = useState<string>("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Check for both custom mode parameter and Supabase's recovery type
  const isResetMode = searchParams.get("mode") === "reset" || searchParams.get("type") === "recovery";

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

  // Check for recovery session on mount (when user clicks email link)
  useEffect(() => {
    const checkRecoverySession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      // If there's a session and we have recovery type in URL, user came from email
      if (session && (searchParams.get("type") === "recovery" || searchParams.get("mode") === "reset")) {
        // Session is already established by Supabase, just show the reset form
        console.log("Recovery session detected");
      }
    };
    checkRecoverySession();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login flow unchanged
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        // Pre-validate signup to check for abuse patterns
        const { data: validationResult, error: validationError } = 
          await supabase.functions.invoke('validate-signup', {
            body: {
              email,
              deviceFingerprint,
            }
          });

        if (validationError) {
          toast.error("Validation failed. Please try again.");
          setLoading(false);
          return;
        }

        if (!validationResult?.allowed) {
          toast.error(validationResult?.message || "Signup not allowed. Please contact support if you believe this is an error.");
          setLoading(false);
          return;
        }

        if (validationResult.requires_verification) {
          toast.warning("Your account requires additional verification.");
        }

        // Proceed with signup, pass metadata
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              device_fingerprint: deviceFingerprint,
            },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });
        
        if (error) throw error;
        toast.success("Account created! Welcome to The Landry Method!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth?mode=reset`,
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
                  <CardTitle>Set New Password</CardTitle>
                  <CardDescription>
                    Enter your new password below
                  </CardDescription>
                </CardHeader>

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
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-muted-foreground hover:bg-gradient-to-r hover:from-[hsl(280,70%,70%)] hover:via-[hsl(265,65%,55%)] hover:to-[hsl(290,75%,65%)] hover:bg-clip-text hover:text-transparent transition-colors"
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
