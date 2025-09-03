import type { FC } from 'react'
import styled from 'styled-components'
import Tab from './Tab'
import { AddButtonWithTooltip } from './AddButton'
import type { TabData } from './_hooks/useTabs'

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
`

const AddButtonContainer = styled.div`
  display: flex;
  font-family: 'Instrument Sans', sans-serif;
  justify-content: center;
  margin-top: 8px;
`

interface TabGroupProps {
  tabs: TabData[]
  currentTabId?: string
  onAddTab: () => void
}

const TabGroup: FC<TabGroupProps> = ({ tabs, currentTabId, onAddTab }) => (
  <GroupContainer>
    {tabs.map((tab) => (
      <Tab key={tab.id} tab={tab} currentTabId={currentTabId} />
    ))}
    <AddButtonContainer>
      <AddButtonWithTooltip onClick={onAddTab} />
    </AddButtonContainer>
  </GroupContainer>
)

export default TabGroup
