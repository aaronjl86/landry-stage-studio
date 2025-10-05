import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import tlmLogo from "@/assets/tlm-logo-white.png";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
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
    <div className="min-h-screen flex items-center justify-center bg-[image:var(--gradient-subtle)] p-4">
      <div className="w-full max-w-4xl">
        {/* Logo Size Comparison */}
        <div className="mb-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 text-center">Logo Size Comparison</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-16">h-8</span>
              <img src={tlmLogo} alt="The Landry Method" className="h-8" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-16">h-10</span>
              <img src={tlmLogo} alt="The Landry Method" className="h-10" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-16">h-12</span>
              <img src={tlmLogo} alt="The Landry Method" className="h-12" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-16">h-16</span>
              <img src={tlmLogo} alt="The Landry Method" className="h-16" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-16">h-20</span>
              <img src={tlmLogo} alt="The Landry Method" className="h-20" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-16">h-24</span>
              <img src={tlmLogo} alt="The Landry Method" className="h-24" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-16">h-32</span>
              <img src={tlmLogo} alt="The Landry Method" className="h-32" />
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center mb-8">
          <img src={tlmLogo} alt="The Landry Method" className="h-12" />
        </Link>

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
