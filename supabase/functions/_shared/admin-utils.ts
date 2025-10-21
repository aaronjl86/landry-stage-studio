import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

/**
 * Check if a user has admin role
 * @param userId - The user ID to check
 * @param supabase - Supabase client instance
 * @returns true if user is admin, false otherwise
 */
export async function isAdmin(userId: string, supabase: SupabaseClient): Promise<boolean> {
  const { data } = await supabase.rpc('has_role', { 
    _user_id: userId, 
    _role: 'admin' 
  });
  
  return !!data;
}

/**
 * Require admin role or throw error
 * @param userId - The user ID to check
 * @param supabase - Supabase client instance
 * @throws Error if user is not admin
 */
export async function requireAdmin(userId: string, supabase: SupabaseClient): Promise<void> {
  const adminStatus = await isAdmin(userId, supabase);
  
  if (!adminStatus) {
    throw new Error('Admin access required');
  }
}

/**
 * Check admin status and return result with user-friendly error
 * @param userId - The user ID to check
 * @param supabase - Supabase client instance
 * @returns Object with isAdmin boolean and optional error
 */
export async function checkAdminStatus(
  userId: string, 
  supabase: SupabaseClient
): Promise<{ isAdmin: boolean; error?: string }> {
  try {
    const adminStatus = await isAdmin(userId, supabase);
    return { isAdmin: adminStatus };
  } catch (error) {
    return { 
      isAdmin: false, 
      error: 'Failed to verify admin status' 
    };
  }
}
