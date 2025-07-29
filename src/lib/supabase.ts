import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for AI Coach
export interface ChatMessage {
  id?: string
  user_id: string
  session_id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  created_at?: string
}

export interface UserContext {
  id?: string
  user_id: string
  goals: string[]
  fitness_level: string
  preferences: {
    workout_types: string[]
    dietary_restrictions: string[]
    equipment: string[]
  }
  current_metrics: {
    weight?: number
    height?: number
    body_fat?: number
  }
  injuries: string[]
  last_updated: string
}

export interface KnowledgeBase {
  id?: string
  topic: string
  content: string
  category: string
  confidence: number
  sources: string[]
  created_at?: string
  updated_at?: string
}

export interface Insight {
  id?: string
  user_id: string
  type: string
  content: string
  confidence: number
  extracted_from: string
  created_at?: string
}