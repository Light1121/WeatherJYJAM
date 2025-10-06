import { supabase } from '../lib/supabase'

export interface UserProfile {
  id: string
  username: string
  email: string
  created_at: string
  updated_at: string
}

/**
 * Get user profile by user ID
 */
export const getUserProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // No profile found
      }
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw error
  }
}

/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId: string,
  updates: Partial<Pick<UserProfile, 'username' | 'email'>>,
): Promise<UserProfile> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}

/**
 * Check if username is available
 */
export const isUsernameAvailable = async (
  username: string,
  excludeUserId?: string,
): Promise<boolean> => {
  try {
    let query = supabase.from('profiles').select('id').eq('username', username)

    if (excludeUserId) {
      query = query.neq('id', excludeUserId)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return data.length === 0
  } catch (error) {
    console.error('Error checking username availability:', error)
    throw error
  }
}
