export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      architectural_violations: {
        Row: {
          created_at: string | null
          edited_image_url: string
          id: string
          original_image_url: string
          reported_by_user: boolean | null
          ssim_score: number | null
          user_id: string | null
          user_prompt: string
          violation_reason: string | null
        }
        Insert: {
          created_at?: string | null
          edited_image_url: string
          id?: string
          original_image_url: string
          reported_by_user?: boolean | null
          ssim_score?: number | null
          user_id?: string | null
          user_prompt: string
          violation_reason?: string | null
        }
        Update: {
          created_at?: string | null
          edited_image_url?: string
          id?: string
          original_image_url?: string
          reported_by_user?: boolean | null
          ssim_score?: number | null
          user_id?: string | null
          user_prompt?: string
          violation_reason?: string | null
        }
        Relationships: []
      }
      blacklisted_identifiers: {
        Row: {
          blocked_until: string | null
          created_at: string | null
          id: string
          identifier_type: string
          identifier_value: string
          permanent: boolean | null
          reason: string | null
        }
        Insert: {
          blocked_until?: string | null
          created_at?: string | null
          id?: string
          identifier_type: string
          identifier_value: string
          permanent?: boolean | null
          reason?: string | null
        }
        Update: {
          blocked_until?: string | null
          created_at?: string | null
          id?: string
          identifier_type?: string
          identifier_value?: string
          permanent?: boolean | null
          reason?: string | null
        }
        Relationships: []
      }
      blocked_email_domains: {
        Row: {
          created_at: string | null
          domain: string
          id: string
          reason: string | null
        }
        Insert: {
          created_at?: string | null
          domain: string
          id?: string
          reason?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string
          id?: string
          reason?: string | null
        }
        Relationships: []
      }
      credit_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string | null
          id: string
          metadata: Json | null
          operation: string
          ref: string | null
          service: string | null
          user_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          operation: string
          ref?: string | null
          service?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          operation?: string
          ref?: string | null
          service?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          abuse_flags: Json | null
          avatar_url: string | null
          card_verified: boolean | null
          created_at: string | null
          device_fingerprint: string | null
          email: string
          email_verified: boolean | null
          full_name: string | null
          id: string
          phone_verified: boolean | null
          quota: number | null
          risk_level: string | null
          signup_ip: unknown
          updated_at: string | null
          used: number | null
        }
        Insert: {
          abuse_flags?: Json | null
          avatar_url?: string | null
          card_verified?: boolean | null
          created_at?: string | null
          device_fingerprint?: string | null
          email: string
          email_verified?: boolean | null
          full_name?: string | null
          id: string
          phone_verified?: boolean | null
          quota?: number | null
          risk_level?: string | null
          signup_ip?: unknown
          updated_at?: string | null
          used?: number | null
        }
        Update: {
          abuse_flags?: Json | null
          avatar_url?: string | null
          card_verified?: boolean | null
          created_at?: string | null
          device_fingerprint?: string | null
          email?: string
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          phone_verified?: boolean | null
          quota?: number | null
          risk_level?: string | null
          signup_ip?: unknown
          updated_at?: string | null
          used?: number | null
        }
        Relationships: []
      }
      signup_attempts: {
        Row: {
          created_at: string | null
          device_fingerprint: string | null
          email: string
          email_domain: string
          id: string
          ip_address: unknown
          metadata: Json | null
          risk_score: number | null
          status: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_fingerprint?: string | null
          email: string
          email_domain: string
          id?: string
          ip_address: unknown
          metadata?: Json | null
          risk_score?: number | null
          status?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_fingerprint?: string | null
          email?: string
          email_domain?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          risk_score?: number | null
          status?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string | null
          credits_per_month: number
          description: string | null
          id: string
          name: string
          plan_code: string
          price_id: string | null
          product_id: string | null
        }
        Insert: {
          created_at?: string | null
          credits_per_month: number
          description?: string | null
          id?: string
          name: string
          plan_code: string
          price_id?: string | null
          product_id?: string | null
        }
        Update: {
          created_at?: string | null
          credits_per_month?: number
          description?: string | null
          id?: string
          name?: string
          plan_code?: string
          price_id?: string | null
          product_id?: string | null
        }
        Relationships: []
      }
      uploads: {
        Row: {
          created_at: string | null
          credits_used: number
          id: string
          is_public: boolean
          original_image_url: string
          staged_image_url: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          credits_used?: number
          id?: string
          is_public?: boolean
          original_image_url: string
          staged_image_url?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          credits_used?: number
          id?: string
          is_public?: boolean
          original_image_url?: string
          staged_image_url?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "uploads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_credits: {
        Row: {
          created_at: string | null
          credits: number
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          credits?: number
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          credits?: number
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_credits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_payment_info: {
        Row: {
          created_at: string | null
          id: string
          period_end: string | null
          period_start: string | null
          plan_code: string | null
          stripe_subscription_id: string | null
          subscription_status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          plan_code?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          plan_code?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string | null
          credits_per_month: number
          id: string
          plan_name: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          credits_per_month: number
          id?: string
          plan_name: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          credits_per_month?: number
          id?: string
          plan_name?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      public_uploads: {
        Row: {
          created_at: string | null
          id: string | null
          original_image_url: string | null
          staged_image_url: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          original_image_url?: string | null
          staged_image_url?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          original_image_url?: string | null
          staged_image_url?: string | null
          status?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_signup_abuse: {
        Args: { _device_fingerprint?: string; _email: string; _ip: unknown }
        Returns: Json
      }
      credits_consume: {
        Args: {
          _amount: number
          _period_end?: string
          _period_start?: string
          _ref?: string
          _service?: string
          _user_id: string
        }
        Returns: Json
      }
      credits_provision: {
        Args: { _plan_code: string; _user_id?: string }
        Returns: Json
      }
      credits_refund: {
        Args: {
          _amount: number
          _original_ref?: string
          _ref?: string
          _service?: string
          _user_id: string
        }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
