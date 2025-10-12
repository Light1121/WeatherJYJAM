import { useState, type FC } from 'react'
import styled from 'styled-components'
import type { TabData } from '@/_components/ContextHooks/TabsContext'
import DeleteModal from './DeleteModal'

interface TabItemProps {
  tab: TabData
  isActive: boolean
  isCollapsed: boolean
  onClick: () => void
  onEdit: () => void
  onDelete: () => void
  canDelete: boolean
}

const formatDate = (date: Date): string => {
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`
  if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}d ago`
  return date.toLocaleDateString()
}

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

const bounceIn = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  60% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`

const bounceOut = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0; }
`

// --- Styled Components ---
const TabItemWrapper = styled.div<{
  $isActive: boolean
  $isCollapsed: boolean
}>`
  position: relative;
  padding: ${({ $isCollapsed }) => ($isCollapsed ? '12px 8px' : '12px 16px')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $isActive }) => ($isActive ? '#99ccff' : '#b3e0ff')};
  color: #1d3c66;
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
  font-family: 'Instrument Sans', sans-serif;

  &:hover {
    background: #99ccff;
    font-weight: bold;
  }

  &:active {
    background: #99ccff;
    font-weight: bold;
  }
`

const TabContent = styled.div<{ $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isCollapsed }) =>
    $isCollapsed ? 'center' : 'space-between'};
  width: 100%;
  font-family: 'Instrument Sans', sans-serif;
`

const TabIcon = styled.div<{ $isActive: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: ${({ $isActive }) =>
    $isActive ? 'rgba(255,255,255,0.2)' : '#e5e7eb'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({ $isActive }) => ($isActive ? 'white' : '#6b7280')};
  margin-right: 8px;
  font-family: 'Instrument Sans', sans-serif;
`

const TabActions = styled.div<{ $isCollapsed: boolean; $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? 0 : 1)};
  transition: opacity 0.3s ease;
  font-family: 'Instrument Sans', sans-serif;
`

const ActionButton = styled.button<{ $isActive: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: none;
  background: ${({ $isActive }) =>
    $isActive ? 'rgba(255,255,255,0.2)' : '#e5e7eb'};
  color: ${({ $isActive }) => ($isActive ? 'white' : '#6b7280')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: 'Instrument Sans', sans-serif;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $isActive }) =>
      $isActive ? 'rgba(255,255,255,0.3)' : '#d1d5db'};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`

export const TabItem: FC<TabItemProps> = ({
  tab,
  isActive,
  isCollapsed,
  onClick,
  onEdit,
  onDelete,
  canDelete,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit()
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    onDelete()
    setShowDeleteModal(false)
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
  }

  return (
    <>
      <TabItemWrapper
        $isActive={isActive}
        $isCollapsed={isCollapsed}
        onClick={onClick}
      >
        <TabContent $isCollapsed={isCollapsed}>
          <TabIcon $isActive={isActive}>📍</TabIcon>

          {!isCollapsed && (
            <div style={{ flex: 1, fontFamily: 'Instrument Sans, sans-serif' }}>
              <div>{tab.name}</div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>
                {tab.pins.length} pins • {tab.lastModified.toLocaleDateString()}
              </div>
            </div>
          )}

          <TabActions $isCollapsed={isCollapsed} $isActive={isActive}>
            <ActionButton $isActive={isActive} onClick={handleEdit}>
              ✏️
            </ActionButton>
            {canDelete && (
              <ActionButton $isActive={isActive} onClick={handleDelete}>
                🗑️
              </ActionButton>
            )}
          </TabActions>
        </TabContent>
      </TabItemWrapper>

      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          message={`Are you sure you want to delete "${tab.name}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  )
}

export default TabItem
