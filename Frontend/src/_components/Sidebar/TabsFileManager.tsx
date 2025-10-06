import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useTabsContext } from '../ContextHooks/useTabsContext'

const FileManagementContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f8f9fa;
`

const FileManagementTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #495057;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const FileButton = styled.button`
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  border: 1px solid #007bff;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    border-color: #6c757d;
    cursor: not-allowed;
  }
`

const ClearButton = styled(FileButton)`
  background-color: #dc3545;
  border-color: #dc3545;

  &:hover {
    background-color: #c82333;
    border-color: #bd2130;
  }
`

const HiddenFileInput = styled.input`
  display: none;
`

const StatusMessage = styled.div<{ $type: 'success' | 'error' }>`
  margin-top: 0.5rem;
  padding: 0.5rem;
  font-size: 0.8rem;
  border-radius: 4px;
  background-color: ${props => props.$type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.$type === 'success' ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.$type === 'success' ? '#c3e6cb' : '#f5c6cb'};
`

export const TabsFileManager: React.FC = () => {
  const { tabs, exportTabsToJSON, importTabsFromJSON, clearAllTabs } = useTabsContext()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handleExport = () => {
    try {
      exportTabsToJSON()
      setStatusMessage({ text: `Exported ${tabs.length} tabs successfully!`, type: 'success' })
      setTimeout(() => setStatusMessage(null), 3000)
    } catch {
      setStatusMessage({ text: 'Failed to export tabs', type: 'error' })
      setTimeout(() => setStatusMessage(null), 3000)
    }
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      await importTabsFromJSON(file)
      setStatusMessage({ text: 'Tabs imported successfully!', type: 'success' })
      setTimeout(() => setStatusMessage(null), 3000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to import tabs'
      setStatusMessage({ text: errorMessage, type: 'error' })
      setTimeout(() => setStatusMessage(null), 3000)
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all tabs? This action cannot be undone.')) {
      clearAllTabs()
      setStatusMessage({ text: 'All tabs cleared and reset to default', type: 'success' })
      setTimeout(() => setStatusMessage(null), 3000)
    }
  }

  return (
    <FileManagementContainer>
      <FileManagementTitle>Tab Management</FileManagementTitle>
      
      <ButtonGroup>
        <FileButton onClick={handleExport} disabled={tabs.length === 0}>
          Export Tabs
        </FileButton>
        
        <FileButton onClick={handleImportClick}>
          Import Tabs
        </FileButton>
        
        <ClearButton onClick={handleClear}>
          Clear All
        </ClearButton>
      </ButtonGroup>

      <HiddenFileInput
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
      />

      {statusMessage && (
        <StatusMessage $type={statusMessage.type}>
          {statusMessage.text}
        </StatusMessage>
      )}
    </FileManagementContainer>
  )
}