import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../../_components/Button'
import type { TabData } from './_hooks/useTabs'

interface TabProps {
  tab: TabData
  currentTabId?: string
}

const getTabPath = (tabId: string): string =>
  tabId === 'tab1' ? '/' : `/${tabId}`

const Tab: FC<TabProps> = ({ tab, currentTabId }) => {
  const navigate = useNavigate()

  const isActive =
    currentTabId === tab.id || (!currentTabId && tab.id === 'tab1')

  return (
    <Button
      variant="tab"
      isActive={isActive}
      onClick={() => navigate(getTabPath(tab.id))}
    >
      {tab.title}
    </Button>
  )
}

export default Tab
