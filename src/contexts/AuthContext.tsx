import { createContext, useContext, useEffect, useState, ReactNode } from "react";
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
  freeTrialCredits: number;
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
  const [freeTrialCredits, setFreeTrialCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscription, setSubscription] = useState<SubscriptionInfo>({
    subscribed: false,
    product_id: null,
    subscription_end: null,
  });

  const checkSubscriptionInternal = async (currentUser: User) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (!error && data) {
        setSubscription(data);
      }
    } catch (error) {
      console.error('Failed to check subscription:', error);
    }
  };

  const checkAdminStatusInternal = async (currentUser: User) => {
    if (!supabase) return;
    console.log('[AuthContext] Checking admin status for user:', currentUser.id);
    try {
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: currentUser.id,
        _role: 'admin'
      });

      if (error) {
        console.error('[AuthContext] Failed to check admin status via RPC:', error);
        setIsAdmin(false);
        return;
      }

      console.log('[AuthContext] Admin check result:', data);
      setIsAdmin(!!data);
    } catch (error) {
      console.error('[AuthContext] Exception checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const refreshCreditsInternal = async (currentUser: User) => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", currentUser.id)
      .single();

    if (!error && data) {
      // Safely access properties that might not exist
      const quota = (data as any).quota ?? 0;
      const used = (data as any).used ?? 0;
      const freeTrialRemaining = (data as any).free_trial_uploads_remaining ?? 0;
      
      setCredits(Math.max(0, quota - used));
      setFreeTrialCredits(freeTrialRemaining);
    } else if (error) {
      console.error('Failed to refresh credits:', error);
      setCredits(0);
      setFreeTrialCredits(0);
    }
  };

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
    // Safety timeout to ensure loading state resolves
    const timeout = setTimeout(() => {
      console.warn('Auth initialization timed out, forcing loading to false');
      setLoading(false);
    }, 5000);

    // If supabase is not initialized, skip auth setup
    if (!supabase) {
      console.warn('Supabase client not initialized, skipping auth setup');
      setLoading(false);
      return () => clearTimeout(timeout);
    }

    // Set up auth state listener
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer any backend calls to avoid blocking the auth event
        if (session?.user) {
          setTimeout(() => {
            Promise.all([
              refreshCreditsInternal(session.user),
              checkSubscriptionInternal(session.user),
              checkAdminStatusInternal(session.user)
            ]).catch((error) => {
              console.error('Error refreshing user data:', error);
            });
          }, 0);
        } else {
          setCredits(0);
          setFreeTrialCredits(0);
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
        try {
          await Promise.all([
            refreshCreditsInternal(session.user),
            checkSubscriptionInternal(session.user),
            checkAdminStatusInternal(session.user)
          ]);
        } catch (error) {
          console.error('Error initializing user data:', error);
        }
      }
      
      clearTimeout(timeout);
      setLoading(false);
    }).catch((error) => {
      console.error('Error getting session:', error);
      clearTimeout(timeout);
      setLoading(false);
    });

    return () => {
      clearTimeout(timeout);
      authSub.unsubscribe();
    };
  }, []);

  // Subscribe to realtime updates for subscription changes
  useEffect(() => {
    if (!user || !supabase) return;

    console.log('[AuthContext] Setting up realtime subscription for user:', user.id);
    
    const channel = supabase
      .channel('subscription-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_payment_info',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('[AuthContext] Received subscription update:', payload);
          checkSubscriptionInternal(user);
        }
      )
      .subscribe();

    return () => {
      console.log('[AuthContext] Cleaning up realtime subscription');
      supabase.removeChannel(channel);
    };
  }, [user]);


  const signOut = async () => {
    console.log('[AuthContext] Sign out clicked');
    try {
      if (!supabase) return;
      await supabase.auth.signOut();
    } catch (err) {
      console.error('[AuthContext] signOut error:', err);
    } finally {
      setUser(null);
      setSession(null);
      setCredits(0);
      setFreeTrialCredits(0);
      setIsAdmin(false);
      setSubscription({ subscribed: false, product_id: null, subscription_end: null });
      // Redirect to the sign-in screen after ensuring sign-out completed
      const target = `${window.location.origin}/auth`;
      console.log('[AuthContext] Redirecting to:', target);
      window.location.replace(target);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      credits, 
      freeTrialCredits,
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
