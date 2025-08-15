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
  onAddTab: () => void
}

const TabGroup: FC<TabGroupProps> = ({ tabs, onAddTab }) => (
  <GroupContainer>
    {tabs.map((tab) => (
      <Tab key={tab.id} tab={tab} />
    ))}
    <AddTabButton onClick={onAddTab} />
  </GroupContainer>
)

export default TabGroup
