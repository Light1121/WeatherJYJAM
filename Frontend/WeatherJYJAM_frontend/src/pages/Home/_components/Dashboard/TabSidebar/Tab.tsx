import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import type { TabData } from './_hooks/useTabs'

interface TabProps {
  tab: TabData
  currentTabId?: string
}

const TabButton = styled.button<{ $active: boolean; $color: string }>`
  background: ${({ $color }) => $color};
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;
  text-align: center;
  font-weight: 400;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;

  ${({ $active }) =>
    $active &&
    css`
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transform: translateY(-1px);
    `}

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }
`

const getTabPath = (tabId: string): string =>
  tabId === 'tab1' ? '/' : `/${tabId}`

const Tab: FC<TabProps> = ({ tab, currentTabId }) => {
  const navigate = useNavigate()
  const isActive =
    currentTabId === tab.id || (!currentTabId && tab.id === 'tab1')

  return (
    <TabButton
      $active={isActive}
      $color={tab.color}
      onClick={() => navigate(getTabPath(tab.id))}
    >
      {tab.title}
    </TabButton>
  )
}

export default Tab
