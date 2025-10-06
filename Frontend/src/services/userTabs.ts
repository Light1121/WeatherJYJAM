import { supabase } from '../lib/supabase'

export interface UserTab {
  id: string
  name: string
  content: Record<string, unknown>
  [key: string]: unknown
}

export interface TabsData {
  tabs: UserTab[]
  activeTabId?: string
  // Add other tab-related data as needed
}

/**
 * Get user's tab data
 */
export const getUserTabs = async (userId: string): Promise<TabsData | null> => {
  try {
    const { data, error } = await supabase
      .from('user_tabs')
      .select('tab_data')
      .eq('user_id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No data found, return default structure
        return { tabs: [] }
      }
      throw error
    }

    return data.tab_data as TabsData
  } catch (error) {
    console.error('Error fetching user tabs:', error)
    throw error
  }
}

/**
 * Save user's tab data
 */
export const saveUserTabs = async (
  userId: string,
  tabsData: TabsData,
): Promise<void> => {
  try {
    const { error } = await supabase.from('user_tabs').upsert({
      user_id: userId,
      tab_data: tabsData,
    })

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error saving user tabs:', error)
    throw error
  }
}

/**
 * Update user's tab data
 */
export const updateUserTabs = async (
  userId: string,
  tabsData: TabsData,
): Promise<void> => {
  return saveUserTabs(userId, tabsData)
}

/**
 * Delete all user tabs
 */
export const deleteUserTabs = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('user_tabs')
      .delete()
      .eq('user_id', userId)

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error deleting user tabs:', error)
    throw error
  }
}
