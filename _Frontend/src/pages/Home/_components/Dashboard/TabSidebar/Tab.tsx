import type { FC } from 'react'
import styled, { css } from 'styled-components'
import type { TabData } from './_hooks/types'
import { useTab } from './_hooks/useTabs'

interface TabProps {
  tab: TabData
  currentTabId?: string
  onRenameTab?: (id: string, newTitle: string) => void
  onCloseTab?: (id: string) => void
  onToggleFavorite?: (id: string) => void
}

const TabContainer = styled.div<{ $active: boolean; $color: string }>`
  background: ${({ $color }) => $color};
  border: none;
  padding: 8px;
  border-radius: 6px 0 0 6px;
  cursor: pointer;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  min-width: 100px;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    z-index 0.2s ease;
  position: relative;

  &:hover {
    box-shadow: 6px rgba(0, 0, 0, 0.3);
    transform: ${({ $active }) => ($active ? 'scale(1.45)' : 'scale(1.05)')};
    z-index: ${({ $active }) => ($active ? 10 : 1)};
  }

  ${({ $active }) =>
    $active &&
    css`
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transform: scale(1.4);
      z-index: 10;
    `}
`

const HeartButton = styled.button<{ $isFavorite: boolean }>`\
  background: none;
  border: none;
  font-size: 14px;
  padding: 2px;
  color: ${({ $isFavorite }) => ($isFavorite ? '#e74c3c' : '#bdc3c7')};
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
`

const TabTitle = styled.div`
  flex: 1;
  text-align: center;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  padding: 2px;
  color: #7f8c8d;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  font-weight: bold;

  &:hover {
    color: #e74c3c;
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

const Tab: FC<TabProps> = ({
  tab,
  currentTabId,
  onRenameTab,
  onCloseTab,
  onToggleFavorite,
}) => {
  const {
    isActive,
    isFavorite,
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
  } = useTab(
    tab.id,
    currentTabId,
    tab.title,
    onRenameTab,
    onCloseTab,
    onToggleFavorite,
  )

  return (
    <TabContainer
      $active={isActive}
      $color={tab.color}
      onDoubleClick={startEditing}
      onClick={handleContainerClick}
    >
      <HeartButton
        $isFavorite={isFavorite}
        onClick={handleHeartClick}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        ♥
      </HeartButton>

      <TabTitle>
        {editing ? (
          <Input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleEditComplete}
            onKeyDown={handleKeyDown}
          />
        ) : (
          tab.title
        )}
      </TabTitle>

      <CloseButton onClick={handleCloseClick} title="Close tab">
        ×
      </CloseButton>
    </TabContainer>
  )
}

export default Tab
