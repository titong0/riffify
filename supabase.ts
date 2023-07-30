export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
        Relationships: [
          {
            foreignKeyName: "heardles_artist_id_fkey"
            columns: ["artist_id"]
            referencedRelation: "artists"
            referencedColumns: ["id"]
          }
        ]
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
