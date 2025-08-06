export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address_id: string
          business_name: string
          company_image: string | null
          created_at: string
          detail_address: string | null
          is_default: boolean
          postal_code: string
          road_address: string
          user_id: string | null
        }
        Insert: {
          address_id?: string
          business_name: string
          company_image?: string | null
          created_at?: string
          detail_address?: string | null
          is_default: boolean
          postal_code: string
          road_address: string
          user_id?: string | null
        }
        Update: {
          address_id?: string
          business_name?: string
          company_image?: string | null
          created_at?: string
          detail_address?: string | null
          is_default?: boolean
          postal_code?: string
          road_address?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      auctions: {
        Row: {
          address_id: string
          auction_id: string
          created_at: string
          current_point: number
          description: string
          end_date: string
          favorite_count: number
          favorites: string[]
          highest_bidder_id: string | null
          image_urls: string[]
          max_point: number
          starting_point: number
          status: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address_id: string
          auction_id?: string
          created_at?: string
          current_point?: number
          description: string
          end_date?: string
          favorite_count?: number
          favorites?: string[]
          highest_bidder_id?: string | null
          image_urls?: string[]
          max_point: number
          starting_point: number
          status?: string
          title: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          address_id?: string
          auction_id?: string
          created_at?: string
          current_point?: number
          description?: string
          end_date?: string
          favorite_count?: number
          favorites?: string[]
          highest_bidder_id?: string | null
          image_urls?: string[]
          max_point?: number
          starting_point?: number
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "auctions_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["address_id"]
          },
          {
            foreignKeyName: "auctions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          auction_id: string | null
          buyer_id: string | null
          created_at: string | null
          id: string
          seller_id: string | null
          updated_at: string | null
        }
        Insert: {
          auction_id?: string | null
          buyer_id?: string | null
          created_at?: string | null
          id?: string
          seller_id?: string | null
          updated_at?: string | null
        }
        Update: {
          auction_id?: string | null
          buyer_id?: string | null
          created_at?: string | null
          id?: string
          seller_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_rooms_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auctions"
            referencedColumns: ["auction_id"]
          },
          {
            foreignKeyName: "chat_rooms_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_rooms_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      episodes: {
        Row: {
          auction_id: string | null
          bid_date: string | null
          bid_point: number | null
          created_at: string
          description: string
          episode_id: string
          likes: string[]
          title: string
          updated_at: string | null
          user_id: string | null
          winning_bid: boolean | null
        }
        Insert: {
          auction_id?: string | null
          bid_date?: string | null
          bid_point?: number | null
          created_at?: string
          description: string
          episode_id?: string
          likes?: string[]
          title: string
          updated_at?: string | null
          user_id?: string | null
          winning_bid?: boolean | null
        }
        Update: {
          auction_id?: string | null
          bid_date?: string | null
          bid_point?: number | null
          created_at?: string
          description?: string
          episode_id?: string
          likes?: string[]
          title?: string
          updated_at?: string | null
          user_id?: string | null
          winning_bid?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "episodes_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auctions"
            referencedColumns: ["auction_id"]
          },
          {
            foreignKeyName: "episodes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          auction_id: string
          created_at: string
          description: string
          inquiry_id: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auction_id: string
          created_at?: string
          description: string
          inquiry_id?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auction_id?: string
          created_at?: string
          description?: string
          inquiry_id?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inquiry_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auctions"
            referencedColumns: ["auction_id"]
          },
          {
            foreignKeyName: "inquiry_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      keywords: {
        Row: {
          count: number
          keyword: string
          keyword_id: number
          updated_at: string
        }
        Insert: {
          count?: number
          keyword: string
          keyword_id?: number
          updated_at?: string
        }
        Update: {
          count?: number
          keyword?: string
          keyword_id?: number
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          chat_room_id: string | null
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          read_at: string | null
          sender_id: string | null
        }
        Insert: {
          chat_room_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          read_at?: string | null
          sender_id?: string | null
        }
        Update: {
          chat_room_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          read_at?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_room_id_fkey"
            columns: ["chat_room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      points: {
        Row: {
          amount: number
          balance_after: number
          created_at: string
          description: string
          point_id: string
          source: string
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string
          description: string
          point_id?: string
          source: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string
          description?: string
          point_id?: string
          source?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ranking: {
        Row: {
          auction_id: string
          bid_amount: number
          created_at: string
          id: string
          rank_position: number
          updated_at: string
          user_id: string
        }
        Insert: {
          auction_id: string
          bid_amount: number
          created_at?: string
          id?: string
          rank_position: number
          updated_at?: string
          user_id: string
        }
        Update: {
          auction_id?: string
          bid_amount?: number
          created_at?: string
          id?: string
          rank_position?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ranking_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auctions"
            referencedColumns: ["auction_id"]
          },
          {
            foreignKeyName: "ranking_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          address_id: string | null
          created_at: string
          email: string
          id: string
          nick_name: string
          point: number
          role: string
          subscription: Json | null
          user_avatar: string | null
        }
        Insert: {
          address_id?: string | null
          created_at?: string
          email: string
          id?: string
          nick_name: string
          point?: number
          role: string
          subscription?: Json | null
          user_avatar?: string | null
        }
        Update: {
          address_id?: string | null
          created_at?: string
          email?: string
          id?: string
          nick_name?: string
          point?: number
          role?: string
          subscription?: Json | null
          user_avatar?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      user_bid_totals: {
        Row: {
          auction_id: string | null
          episode_id: string | null
          total_bid_points: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "episodes_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auctions"
            referencedColumns: ["auction_id"]
          },
          {
            foreignKeyName: "points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      valid_user_bid_totals: {
        Row: {
          auction_id: string | null
          total_bid_points: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "episodes_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auctions"
            referencedColumns: ["auction_id"]
          },
          {
            foreignKeyName: "episodes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_auction_detail_with_address: {
        Args: { auction_id_param: string }
        Returns: {
          auction_id: string
          user_id: string
          title: string
          description: string
          current_point: number
          max_point: number
          image_urls: string[]
          end_date: string
          favorites: string[]
          status: string
          address_id: string
          business_name: string
          postal_code: string
          road_address: string
          detail_address: string
          company_image: string
        }[]
      }
      get_auction_details: {
        Args:
          | { auction_id: string }
          | { auction_id_param: string }
          | { user_id: number }
        Returns: {
          title: string
          description: string
          starting_point: number
          max_point: number
          image_urls: string[]
          end_date: string
          business_name: string
          postal_code: string
          road_address: string
          detail_address: string
        }[]
      }
      get_auction_form: {
        Args: { auction_id_param: string }
        Returns: {
          title: string
          description: string
          starting_point: number
          max_point: number
          image_urls: string[]
          end_date: string
          address_id: string
          business_name: string
          postal_code: string
          road_address: string
          detail_address: string
        }[]
      }
      get_auction_summary_with_address: {
        Args: { auction_id_param: string }
        Returns: {
          auction_id: string
          title: string
          end_date: string
          image_urls: string[]
          address_id: string
          business_name: string
          postal_code: string
          road_address: string
          detail_address: string
        }[]
      }
      set_winning_bid: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
