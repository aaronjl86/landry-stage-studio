import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deviceFingerprint, setDeviceFingerprint] = useState<string>("");
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <Card>
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
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
              </Button>

              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </CardFooter>
          </form>
        </Card>
        </div>
      </div>
    </div>
  );
}
