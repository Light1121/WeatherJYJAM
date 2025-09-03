import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import type { TabData } from './_hooks/useTabs'
import { useState, useRef, useEffect } from 'react'

interface TabProps {
  tab: TabData
  currentTabId?: string
  onRenameTab?: (id: string, newTitle: string) => void
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
  display: flex;
  justify-content: center;
  align-items: center;

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

const Input = styled.input`
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  background-color: rgba(154, 146, 146, 0.3);
  border: none;
  outline: none;
  width: 100%;
  text-align: center;
`

const getTabPath = (tabId: string): string =>
  tabId === 'tab1' ? '/' : `/${tabId}`

const Tab: FC<TabProps> = ({ tab, currentTabId, onRenameTab }) => {
  const navigate = useNavigate()
  const isActive =
    currentTabId === tab.id || (!currentTabId && tab.id === 'tab1')

  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(tab.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const handleBlur = () => {
    const newTitle = title.trim() || tab.title
    onRenameTab?.(tab.id, newTitle)
    setEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') inputRef.current?.blur()
    if (e.key === 'Escape') {
      setTitle(tab.title)
      setEditing(false)
    }
  }

  return (
    <TabButton
      $active={isActive}
      $color={tab.color}
      onDoubleClick={() => setEditing(true)}
      onClick={() => !editing && navigate(getTabPath(tab.id))}
    >
      {editing ? (
        <Input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        tab.title
      )}
    </TabButton>
  )
}

export default Tab
