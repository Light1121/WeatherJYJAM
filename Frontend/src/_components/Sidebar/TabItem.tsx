import { useState } from 'react'
import type { FC } from 'react'
import styled from 'styled-components'
import type { TabData } from '@/_components/ContextHooks/TabsContext'

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

  if (diffInHours < 1) {
    return 'Just now'
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`
  } else if (diffInHours < 24 * 7) {
    return `${Math.floor(diffInHours / 24)}d ago`
  } else {
    return date.toLocaleDateString()
  }
}

const TabItemWrapper = styled.div<{
  $isActive: boolean
  $isCollapsed: boolean
}>`
  position: relative;
  padding: ${({ $isCollapsed }) => ($isCollapsed ? '12px 8px' : '12px 16px')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $isActive }) => ($isActive ? '#a0d4ff' : '#cfe8ff')};
  color: #1e3a8a;
  font-family: 'Instrument Sans', sans-serif;

  &:hover {
    background: #a0d4ff;
  }

  &:active {
    transform: scale(0.98);
  }
`

const TabContent = styled.div<{ $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isCollapsed }) =>
    $isCollapsed ? 'center' : 'space-between'};
  width: 100%;
`

const TabInfo = styled.div<{ $isCollapsed: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? 0 : 1)};
  transition: opacity 0.3s ease;
`

const TabName = styled.span`
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TabMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
  opacity: 0.7;
`

const TabStats = styled.span`
  font-size: 11px;
  font-weight: 400;
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
  flex-shrink: 0;
  margin-right: 8px;
`

const TabActions = styled.div<{ $isCollapsed: boolean; $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? 0 : 1)};
  transition: opacity 0.3s ease;
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
  transition: all 0.2s ease;
  opacity: 0;

  ${TabItemWrapper}:hover & {
    opacity: 1;
  }

  &:hover {
    background: ${({ $isActive }) =>
      $isActive ? 'rgba(255,255,255,0.3)' : '#d1d5db'};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`

const DeleteModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const DeleteModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  font-family: 'Instrument Sans', sans-serif;
  min-width: 300px;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

const ModalButtons = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 12px;
`

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid
    ${({ $variant }) => ($variant === 'primary' ? '#007acc' : '#d1d5db')};
  background: ${({ $variant }) =>
    $variant === 'primary' ? '#007acc' : 'white'};
  color: ${({ $variant }) => ($variant === 'primary' ? 'white' : '#374151')};

  &:hover {
    background: ${({ $variant }) =>
      $variant === 'primary' ? '#005f99' : '#f3f4f6'};
    border-color: ${({ $variant }) =>
      $variant === 'primary' ? '#005f99' : '#9ca3af'};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const TabItem: FC<TabItemProps> = ({
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

  const confirmDelete = () => {
    onDelete()
    setShowDeleteModal(false)
  }

  const cancelDelete = () => setShowDeleteModal(false)

  return (
    <>
      <TabItemWrapper
        $isActive={isActive}
        $isCollapsed={isCollapsed}
        onClick={onClick}
      >
        <TabContent $isCollapsed={isCollapsed}>
          <TabIcon $isActive={isActive}>📍</TabIcon>

          <TabInfo $isCollapsed={isCollapsed}>
            <TabName>{tab.name}</TabName>
            <TabMeta>
              <TabStats>{tab.pins.length} pins</TabStats>
              <TabStats>•</TabStats>
              <TabStats>{formatDate(tab.lastModified)}</TabStats>
            </TabMeta>
          </TabInfo>

          <TabActions $isCollapsed={isCollapsed} $isActive={isActive}>
            <ActionButton
              $isActive={isActive}
              onClick={handleEdit}
              aria-label="Edit tab"
              title="Edit tab"
            >
              ✏️
            </ActionButton>
            {canDelete && (
              <ActionButton
                $isActive={isActive}
                onClick={handleDelete}
                aria-label="Delete tab"
                title="Delete tab"
              >
                🗑️
              </ActionButton>
            )}
          </TabActions>
        </TabContent>
      </TabItemWrapper>

      {showDeleteModal && (
        <DeleteModalBackdrop>
          <DeleteModalContent>
            <p>Are you sure you want to delete "{tab.name}"?</p>
            <ModalButtons>
              <Button $variant="primary" onClick={confirmDelete}>
                Yes
              </Button>
              <Button $variant="secondary" onClick={cancelDelete}>
                Cancel
              </Button>
            </ModalButtons>
          </DeleteModalContent>
        </DeleteModalBackdrop>
      )}
    </>
  )
}

export default TabItem
