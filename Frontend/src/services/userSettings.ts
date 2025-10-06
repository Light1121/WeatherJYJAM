import { supabase } from '../lib/supabase'

export interface UserSettings {
  theme?: 'light' | 'dark' | 'auto'
  language?: string
  notifications?: boolean
  weatherUnits?: 'metric' | 'imperial'
  defaultLocation?: {
    lat: number
    lng: number
    name: string
  }
  // Add other settings as needed
}

/**
 * Get user's settings
 */
export const getUserSettings = async (
  userId: string,
): Promise<UserSettings | null> => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('settings_data')
      .eq('user_id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No data found, return default settings
        return {
          theme: 'auto',
          language: 'en',
          notifications: true,
          weatherUnits: 'metric',
        }
      }
      throw error
    }

    return data.settings_data as UserSettings
  } catch (error) {
    console.error('Error fetching user settings:', error)
    throw error
  }
}

/**
 * Save user's settings
 */
export const saveUserSettings = async (
  userId: string,
  settings: UserSettings,
): Promise<void> => {
  try {
    const { error } = await supabase.from('user_settings').upsert({
      user_id: userId,
      settings_data: settings,
    })

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error saving user settings:', error)
    throw error
  }
}

/**
 * Update specific user setting
 */
export const updateUserSetting = async <K extends keyof UserSettings>(
  userId: string,
  key: K,
  value: UserSettings[K],
): Promise<void> => {
  try {
    // First get current settings
    const currentSettings = await getUserSettings(userId)

    // Update the specific setting
    const updatedSettings = {
      ...currentSettings,
      [key]: value,
    }

    // Save the updated settings
    await saveUserSettings(userId, updatedSettings)
  } catch (error) {
    console.error('Error updating user setting:', error)
    throw error
  }
}

/**
 * Delete all user settings (reset to defaults)
 */
export const deleteUserSettings = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('user_settings')
      .delete()
      .eq('user_id', userId)

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error deleting user settings:', error)
    throw error
  }
}
