import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { User, Session } from "@supabase/supabase-js";

interface SubscriptionInfo {
  subscribed: boolean;
  product_id: string | null;
  subscription_end: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  credits: number;
  loading: boolean;
  subscription: SubscriptionInfo;
  signOut: () => Promise<void>;
  refreshCredits: () => Promise<void>;
  checkSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionInfo>({
    subscribed: false,
    product_id: null,
    subscription_end: null,
  });

  const checkSubscription = async () => {
    if (!user) return;

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (!error && data) {
        setSubscription(data);
      }
    } catch (error) {
      console.error('Failed to check subscription:', error);
    }
  };

  const refreshCredits = async () => {
    if (!user) return;

    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase
      .from("profiles")
      .select("quota, used")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setCredits(data.quota - data.used);
    }
  };

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");

      // Set up auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);

          // Refresh credits and subscription when user logs in
          if (session?.user) {
            setTimeout(() => {
              refreshCredits();
              checkSubscription();
            }, 0);
          } else {
            setCredits(0);
            setSubscription({ subscribed: false, product_id: null, subscription_end: null });
          }
        }
      );
      unsubscribe = () => subscription.unsubscribe();

      // Check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        setTimeout(() => {
          refreshCredits();
          checkSubscription();
        }, 0);
      }
    })();

    return () => unsubscribe?.();
  }, []);

  // Auto-refresh subscription status every minute
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      checkSubscription();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [user]);

  const signOut = async () => {
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setCredits(0);
    setSubscription({ subscribed: false, product_id: null, subscription_end: null });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      credits, 
      loading, 
      subscription, 
      signOut, 
      refreshCredits,
      checkSubscription 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Graceful fallback for screens that don't need auth context.
    // This keeps the public bundle smaller by allowing us to mount
    // the AuthProvider only on routes that need it.
    return {
      user: null,
      session: null,
      credits: 0,
      loading: false,
      subscription: { subscribed: false, product_id: null, subscription_end: null },
      signOut: async () => {},
      refreshCredits: async () => {},
      checkSubscription: async () => {},
    } as const satisfies AuthContextType;
  }
  return context;
};
