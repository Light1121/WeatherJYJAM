import type { FC } from 'react'
import { styled } from 'styled-components'
import useBottomSheet from './_hooks/useBottomSheet'
import WeatherStats from './WeatherStats'
import { usePinContext } from '@/_components/ContextHooks/usePinContext'

const BottomSheetWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 56%;
  transform: translateX(-50%);
  z-index: 400;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: min(92vw, 980px);
`

const HandleButton = styled.button`
  cursor: pointer;
  width: 60px;
  height: 28px;
  border-radius: 20%;
  border: 1px solid #ddd;
  background: white;
  margin-bottom: -5px;
  margin-left: 16px;
  z-index: 500;
  font-size: 16px;
  line-height: 1;
`

const StyledBottomSheet = styled.div<{ isOpen: boolean }>`
  background: white;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: ${({ isOpen }) => (isOpen ? '16px 20px' : '8px 20px')};
  width: 100%;
  max-height: ${({ isOpen }) => (isOpen ? '50vh' : '60px')};
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    padding 0.3s ease;
  position: relative;
`

const ScrollableContent = styled.div`
  overflow-y: auto;
  max-height: calc(50vh - 60px);
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`

const BottomSheet: FC = () => {
  const { isOpen, toggle } = useBottomSheet(false)
  const { locationOnePin, locationTwoPin } = usePinContext()

  // Don't show bottom sheet if no pins are selected
  const hasAnyPin = locationOnePin !== null || locationTwoPin !== null

  if (!hasAnyPin) {
    return null
  }

  return (
    <BottomSheetWrapper>
      <HandleButton onClick={toggle} aria-label="Toggle bottom sheet">
        {isOpen ? '▾' : '▴'}
      </HandleButton>

      <StyledBottomSheet isOpen={isOpen}>
        <ScrollableContent>
          <WeatherStats isExpanded={isOpen} />
        </ScrollableContent>
      </StyledBottomSheet>
    </BottomSheetWrapper>
  )
}

export default BottomSheet
