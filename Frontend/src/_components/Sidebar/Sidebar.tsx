import type { FC } from 'react'
import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import TabItem from './TabItem.tsx'
import AddTabButton from './AddTabButton.tsx'
import { EditTabModal } from './EditTabModal.tsx'
import { TabsFileManager } from './TabsFileManager.tsx'
import { useTabsContext } from '@/_components/ContextHooks/useTabsContext'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`

const SidebarWrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 100px;
  left: 0;
  height: calc(100vh - 100px);
  width: ${({ $isOpen }) => ($isOpen ? '280px' : '0px')};
  background: linear-gradient(180deg, #ffffff 0%, #f8fafb 100%);
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? '2px 0 8px rgba(0, 0, 0, 0.1)' : 'none'};
  transition:
    width 0.3s ease,
    box-shadow 0.3s ease;
  z-index: 999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const ToggleButtonWrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 100px;
  left: ${({ $isOpen }) => ($isOpen ? '280px' : '0px')};
  width: 32px;
  height: 60px;
  border-radius: ${({ $isOpen }) => ($isOpen ? '0 8px 8px 0' : '0 8px 8px 0')};
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-left: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition:
    all 0.3s ease,
    left 0.3s ease;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #f3f4f6;
    border-color: #9ca3af;
  }

  &:active {
    transform: scale(0.95);
  }
`

const SidebarHeader = styled.div<{ $isOpen: boolean }>`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'space-between' : 'center')};
  background: #ffffff;
  min-height: 64px;
`

const SidebarTitle = styled.h2<{ $isOpen: boolean }>`
  font-family: 'Instrument Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
`

const TabsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`

const TabsList = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  /* Animate tab items sliding in */
  & > * {
    animation: ${slideIn} 0.3s ease forwards;
  }
`

const SidebarFooter = styled.div`
  padding: 12px;
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
`

const Sidebar: FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { tabs, activeTabId, addTab, removeTab, renameTab, switchTab } =
    useTabsContext()
  const [editingTabId, setEditingTabId] = useState<string | null>(null)

  const handleAddTab = () => addTab()
  const handleTabClick = (tabId: string) => {
    if (tabId !== activeTabId) switchTab(tabId)
  }
  const handleTabEdit = (tabId: string) => setEditingTabId(tabId)
  const handleTabDelete = (tabId: string) => {
    if (tabs.length > 1) removeTab(tabId)
  }
  const handleTabRename = (tabId: string, newName: string) => {
    renameTab(tabId, newName)
    setEditingTabId(null)
  }
  const handleModalClose = () => setEditingTabId(null)
  const editingTab = tabs.find((tab) => tab.id === editingTabId)

  return (
    <>
      {/* Sidebar panel */}
      <SidebarWrapper $isOpen={isOpen}>
        <SidebarHeader $isOpen={isOpen}>
          {isOpen && <SidebarTitle $isOpen={isOpen}>Map Tabs</SidebarTitle>}
        </SidebarHeader>

        <TabsContainer>
          <TabsList $isOpen={isOpen}>
            {tabs.map((tab) => (
              <TabItem
                key={tab.id}
                tab={tab}
                isActive={tab.id === activeTabId}
                isCollapsed={!isOpen}
                onClick={() => handleTabClick(tab.id)}
                onEdit={() => handleTabEdit(tab.id)}
                onDelete={() => handleTabDelete(tab.id)}
                canDelete={tabs.length > 1}
              />
            ))}
          </TabsList>
        </TabsContainer>

        <SidebarFooter>
          {isOpen && <TabsFileManager />}
          <AddTabButton onClick={handleAddTab} isCollapsed={!isOpen} />
        </SidebarFooter>
      </SidebarWrapper>

      {/* Bookmark-style toggle button */}
      <ToggleButtonWrapper $isOpen={isOpen} onClick={onToggle}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        {isOpen ? '‹' : '›'}
      </ToggleButtonWrapper>

      {editingTab && (
        <EditTabModal
          tab={editingTab}
          onSave={(newName: string) => handleTabRename(editingTab.id, newName)}
          onCancel={handleModalClose}
        />
      )}
    </>
  )
}

export default Sidebar
