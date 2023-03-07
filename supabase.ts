export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Albums: {
        Row: {
          album_id: string
          name: string
          thumb_url: string
        }
        Insert: {
          album_id: string
          name: string
          thumb_url: string
        }
        Update: {
          album_id?: string
          name?: string
          thumb_url?: string
        }
      }
      Artists: {
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
      }
      Heardles: {
        Row: {
          artist_id: string
          created_at: string
          ids_sequence: string[]
          valid_song_names: string[]
        }
        Insert: {
          artist_id: string
          created_at?: string
          ids_sequence: string[]
          valid_song_names: string[]
        }
        Update: {
          artist_id?: string
          created_at?: string
          ids_sequence?: string[]
          valid_song_names?: string[]
        }
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
      }
      Songs: {
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
