import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useTabsContext } from '../ContextHooks/useTabsContext'

const FileManagementContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  font-family: 'Instrument Sans', sans-serif;
  color: #333;
`

const FileManagementTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  color: #333;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const FileButton = styled.button`
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  border: 1px solid #a0d1ff;
  border-radius: 4px;
  background-color: #b3e0ff;
  color: #333;
  cursor: pointer;
  font-family: 'Instrument Sans', sans-serif;
  transition: all 0.2s ease;
  font-weight: 200;

  &:hover {
    background-color: #99ccff;
    border-color: #99ccff;
  }

  &:disabled {
    background-color: #6c757d;
    border-color: #6c757d;
    cursor: not-allowed;
  }
`

const ClearButton = styled(FileButton)`
  background-color: #ffc9c9;
  border-color: #ffc9c9;
  color: #333;

  &:hover {
    background-color: #ffb3b3;
    border-color: #ff9999;
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
  font-family: 'Instrument Sans', sans-serif;
  color: #333;
  background-color: ${(props) =>
    props.$type === 'success' ? '#d4edda' : '#f8d7da'};
  border: 1px solid
    ${(props) => (props.$type === 'success' ? '#c3e6cb' : '#f5c6cb')};
`

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
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

const ModalContent = styled.div`
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

const ModalButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid
    ${({ $variant }) => ($variant === 'primary' ? '#007acc' : '#d1d5db')};
  background: ${({ $variant }) =>
    $variant === 'primary' ? '#b3e0ff' : 'white'};
  color: ${({ $variant }) => ($variant === 'primary' ? '#333' : '#333')};

  &:hover {
    background: ${({ $variant }) =>
      $variant === 'primary' ? '#99ccff' : '#f3f4f6'};
    border-color: ${({ $variant }) =>
      $variant === 'primary' ? '#99ccff' : '#9ca3af'};
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

export const TabsFileManager: React.FC = () => {
  const { tabs, exportTabsToJSON, importTabsFromJSON, clearAllTabs } =
    useTabsContext()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [statusMessage, setStatusMessage] = useState<{
    text: string
    type: 'success' | 'error'
  } | null>(null)
  const [showClearModal, setShowClearModal] = useState(false)

  const handleExport = () => {
    try {
      exportTabsToJSON()
      setStatusMessage({
        text: `Exported ${tabs.length} tabs successfully!`,
        type: 'success',
      })
      setTimeout(() => setStatusMessage(null), 3000)
    } catch {
      setStatusMessage({ text: 'Failed to export tabs', type: 'error' })
      setTimeout(() => setStatusMessage(null), 3000)
    }
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      await importTabsFromJSON(file)
      setStatusMessage({ text: 'Tabs imported successfully!', type: 'success' })
      setTimeout(() => setStatusMessage(null), 3000)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to import tabs'
      setStatusMessage({ text: errorMessage, type: 'error' })
      setTimeout(() => setStatusMessage(null), 3000)
    }

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleClear = () => {
    setShowClearModal(true)
  }

  const confirmClear = () => {
    clearAllTabs()
    setStatusMessage({
      text: 'All tabs cleared and reset to default',
      type: 'success',
    })
    setShowClearModal(false)
    setTimeout(() => setStatusMessage(null), 3000)
  }

  const cancelClear = () => setShowClearModal(false)

  return (
    <FileManagementContainer>
      <FileManagementTitle>Tab Management</FileManagementTitle>

      <ButtonGroup>
        <FileButton onClick={handleExport} disabled={tabs.length === 0}>
          Export Tabs
        </FileButton>

        <FileButton onClick={handleImportClick}>Import Tabs</FileButton>

        <ClearButton onClick={handleClear}>Clear All</ClearButton>
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

      {showClearModal && (
        <ModalBackdrop>
          <ModalContent>
            <p>
              Are you sure you want to clear all tabs? This cannot be undone.
            </p>
            <ModalButtons>
              <ModalButton $variant="primary" onClick={confirmClear}>
                Yes
              </ModalButton>
              <ModalButton $variant="secondary" onClick={cancelClear}>
                Cancel
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalBackdrop>
      )}
    </FileManagementContainer>
  )
}
