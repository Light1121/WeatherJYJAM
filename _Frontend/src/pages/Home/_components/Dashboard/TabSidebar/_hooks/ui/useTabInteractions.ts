export const useTabInteractions = (
  tabId: string,
  editing: boolean,
  navigateToTab: (tabId: string) => void,
  onCloseTab: (id: string) => void,
  onToggleFavorite: () => void
) => {
  const handleContainerClick = () => {
    if (!editing) {
      navigateToTab(tabId)
    }
  }

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCloseTab(tabId)
  }

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite()
  }

  return {
    handleContainerClick,
    handleCloseClick,
    handleHeartClick,
  }
}
