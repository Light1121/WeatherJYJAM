import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fmsbjxisxniimgpkpcuq.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtc2JqeGlzeG5paW1ncGtwY3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NDk2MzEsImV4cCI6MjA3NTMyNTYzMX0.aAZDgHnk7f1Rik-fxvUDGyF_gq0gpsK9xN_ll_Rzv0Y'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Define specific types for better type safety
export interface TabData {
  id: string
  name: string
  content: Record<string, unknown>
  [key: string]: unknown
}

export interface SettingsData {
  theme?: 'light' | 'dark' | 'auto'
  language?: string
  notifications?: boolean
  weatherUnits?: 'metric' | 'imperial'
  [key: string]: unknown
}

// Database types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          email: string
        }
        Update: {
          username?: string
          email?: string
          updated_at?: string
        }
      }
      user_tabs: {
        Row: {
          id: string
          user_id: string
          tab_data: TabData[]
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          tab_data?: TabData[]
        }
        Update: {
          tab_data?: TabData[]
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          settings_data: SettingsData
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          settings_data?: SettingsData
        }
        Update: {
          settings_data?: SettingsData
          updated_at?: string
        }
      }
    }
  }
}
