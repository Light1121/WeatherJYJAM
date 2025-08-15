import type { FC } from 'react'
import styled from 'styled-components'
import Tab from './Tab'
import AddTabButton from './AddTabButton'
import type { TabData } from '../index'

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
`

interface TabGroupProps {
  tabs: TabData[]
  currentTabId?: string
  onAddTab: () => void
}

const TabGroup: FC<TabGroupProps> = ({ tabs, currentTabId, onAddTab }) => (
  <GroupContainer>
    {tabs.map((tab) => (
      <Tab
        key={tab.id}
        tab={tab}
        isActive={
          currentTabId === tab.id || (!currentTabId && tab.id === 'tab1')
        }
      />
    ))}
    <AddTabButton onClick={onAddTab} />
  </GroupContainer>
)

export default TabGroup
