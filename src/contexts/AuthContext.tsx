import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

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
  isAdmin: boolean;
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscription, setSubscription] = useState<SubscriptionInfo>({
    subscribed: false,
    product_id: null,
    subscription_end: null,
  });

<<<<<<< HEAD
  const checkSubscriptionInternal = async (currentUser: User) => {
=======
  const checkSubscription = useCallback(async () => {
    if (!user) return;

>>>>>>> e374208 (Add image optimization with vite-plugin-image-optimizer - 83% file size reduction)
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (!error && data) {
        setSubscription(data);
      }
    } catch (error) {
      console.error('Failed to check subscription:', error);
    }
  }, [user]);

<<<<<<< HEAD
  const checkAdminStatusInternal = async (currentUser: User) => {
    try {
      // Use security definer function to bypass RLS safely
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: currentUser.id,
        _role: 'admin'
      });
=======
  const refreshCredits = useCallback(async () => {
    if (!user) return;
>>>>>>> e374208 (Add image optimization with vite-plugin-image-optimizer - 83% file size reduction)

      if (error) {
        console.error('Failed to check admin status via RPC:', error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(!!data);
    } catch (error) {
      console.error('Failed to check admin status:', error);
      setIsAdmin(false);
    }
  };

  const refreshCreditsInternal = async (currentUser: User) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("quota, used")
      .eq("id", currentUser.id)
      .single();

    if (!error && data) {
      setCredits(data.quota - data.used);
    } else if (error) {
      console.error('Failed to refresh credits:', error);
    }
  }, [user]);

  // Public wrappers for manual refresh
  const refreshCredits = async () => {
    if (!user) return;
    await refreshCreditsInternal(user);
  };

  const checkSubscription = async () => {
    if (!user) return;
    await checkSubscriptionInternal(user);
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Refresh credits and subscription when user logs in
        if (session?.user) {
          await Promise.all([
            refreshCreditsInternal(session.user),
            checkSubscriptionInternal(session.user),
            checkAdminStatusInternal(session.user)
          ]);
        } else {
          setCredits(0);
          setIsAdmin(false);
          setSubscription({ subscribed: false, product_id: null, subscription_end: null });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await Promise.all([
          refreshCreditsInternal(session.user),
          checkSubscriptionInternal(session.user),
          checkAdminStatusInternal(session.user)
        ]);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [checkSubscription, refreshCredits]);

  // Auto-refresh subscription status every minute
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      checkSubscription();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [user, checkSubscription]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setCredits(0);
    setIsAdmin(false);
    setSubscription({ subscribed: false, product_id: null, subscription_end: null });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      credits, 
      loading, 
      subscription,
      isAdmin,
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
