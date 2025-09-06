import { useTabsState } from './domain/useTabsState'
import { useTabFavorites } from './domain/useTabFavorites'
import { useTabEdit } from './ui/useTabEdit'
import { useTabNavigation } from './ui/useTabNavigation'
import { useTabInteractions } from './ui/useTabInteractions'

export type { TabData } from './types'

export const useTab = (
  tabId: string,
  currentTabId: string | undefined,
  initialTitle: string,
  onRenameTab?: (id: string, newTitle: string) => void,
  onCloseTab?: (id: string) => void,
  onToggleFavorite?: (id: string) => void
) => {
  const { isFavorite, toggleFavorite } = useTabFavorites()
  const { navigateToTab } = useTabNavigation()
  
  const {
    editing,
    title,
    inputRef,
    setTitle,
    startEditing,
    commitEdit,
    handleKeyDown,
  } = useTabEdit(initialTitle)

  const isActive = currentTabId === tabId || (!currentTabId && tabId === 'tab1')

  const handleEditComplete = () => {
    const finalTitle = commitEdit()
    onRenameTab?.(tabId, finalTitle)
  }

  const handleToggleFavorite = () => {
    toggleFavorite(tabId)
    onToggleFavorite?.(tabId)
  }

  const { handleContainerClick, handleCloseClick, handleHeartClick } = useTabInteractions(
    tabId,
    editing,
    navigateToTab,
    onCloseTab || (() => {}),
    handleToggleFavorite
  )

  return {
    isActive,
    isFavorite: isFavorite(tabId),
    editing,
    title,
    inputRef,
    setTitle,
    startEditing,
    handleEditComplete,
    handleKeyDown,
    handleContainerClick,
    handleCloseClick,
    handleHeartClick,
  }
}

export const useTabs = () => {
  const { tabs, addTab, removeTab, updateTabTitle } = useTabsState()
  const { toggleFavorite: toggleFav } = useTabFavorites()
  const { navigateToTab, navigateToHome } = useTabNavigation()

  const addNewTab = () => {
    const newTab = addTab()
    navigateToTab(newTab.id)
  }

  const renameTab = (id: string, newTitle: string) => {
    updateTabTitle(id, newTitle)
  }

  const closeTab = (id: string) => {
    removeTab(id)
    navigateToHome()
  }

  const toggleFavorite = (id: string) => {
    toggleFav(id)
  }

  return {
    tabs,
    addNewTab,
    renameTab,
    closeTab,
    toggleFavorite,
  }
}
