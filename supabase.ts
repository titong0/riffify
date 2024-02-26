export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      albums: {
        Row: {
          album_id: string
          for_heardle: string
          name: string
          thumb_url: string
        }
        Insert: {
          album_id: string
          for_heardle: string
          name: string
          thumb_url: string
        }
        Update: {
          album_id?: string
          for_heardle?: string
          name?: string
          thumb_url?: string
        }
        Relationships: []
      }
      artists: {
        Row: {
          avatar_url: string
          description: string
          id: string
          name: string
        }
        Insert: {
          avatar_url: string
          description?: string
          id: string
          name: string
        }
        Update: {
          avatar_url?: string
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      heardles: {
        Row: {
          artist_id: string
          created_at: string
          ids_sequence: string[]
          last_updated: string
          valid_song_names: string[]
        }
        Insert: {
          artist_id: string
          created_at?: string
          ids_sequence: string[]
          last_updated?: string
          valid_song_names: string[]
        }
        Update: {
          artist_id?: string
          created_at?: string
          ids_sequence?: string[]
          last_updated?: string
          valid_song_names?: string[]
        }
        Relationships: []
      }
      removed_songs: {
        Row: {
          reason: string
          removed_from_heardle_id: string
          song_id: string
          title: string
        }
        Insert: {
          reason: string
          removed_from_heardle_id: string
          song_id: string
          title: string
        }
        Update: {
          reason?: string
          removed_from_heardle_id?: string
          song_id?: string
          title?: string
        }
        Relationships: []
      }
      songs: {
        Row: {
          album_id: string
          duration: string
          for_heardle: string
          song_id: string
          title: string
        }
        Insert: {
          album_id: string
          duration: string
          for_heardle: string
          song_id: string
          title: string
        }
        Update: {
          album_id?: string
          duration?: string
          for_heardle?: string
          song_id?: string
          title?: string
        }
        Relationships: []
      }
      updated_today: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
