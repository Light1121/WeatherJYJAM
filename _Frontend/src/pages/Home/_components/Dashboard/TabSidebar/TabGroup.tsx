import type { FC } from 'react'
import Tab from './Tab'
import { AddButtonWithTooltip } from './AddButton'
import type { TabData } from './_hooks/types'
import styled from 'styled-components'

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
`

const AddButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`

interface TabGroupProps {
  tabs: TabData[]
  currentTabId?: string
  onAddTab: () => void
  onRenameTab: (id: string, newTitle: string) => void
  onCloseTab: (id: string) => void
  onToggleFavorite: (id: string) => void
}

const TabGroup: FC<TabGroupProps> = ({
  tabs,
  currentTabId,
  onAddTab,
  onRenameTab,
  onCloseTab,
  onToggleFavorite,
}) => (
  <GroupContainer>
    {tabs.map((tab) => (
      <Tab
        key={tab.id}
        tab={tab}
        currentTabId={currentTabId}
        onRenameTab={onRenameTab}
        onCloseTab={onCloseTab}
        onToggleFavorite={onToggleFavorite}
      />
    ))}
    <AddButtonContainer>
      <AddButtonWithTooltip onClick={onAddTab} />
    </AddButtonContainer>
  </GroupContainer>
)

export default TabGroup
