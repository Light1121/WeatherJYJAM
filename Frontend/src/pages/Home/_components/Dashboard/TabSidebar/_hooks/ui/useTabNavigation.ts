import { useNavigate } from 'react-router-dom'

const getTabPath = (tabId: string): string =>
  tabId === 'tab1' ? '/' : `/${tabId}`

export const useTabNavigation = () => {
  const navigate = useNavigate()

  const navigateToTab = (tabId: string) => {
    navigate(getTabPath(tabId))
  }

  const navigateToHome = () => {
    navigate('/')
  }

  return {
    navigateToTab,
    navigateToHome,
  }
}
