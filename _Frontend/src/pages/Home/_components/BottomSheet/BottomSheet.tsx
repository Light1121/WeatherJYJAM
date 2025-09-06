import type { FC } from 'react'
import { styled } from 'styled-components'
import useBottomSheet from './_hooks/useBottomSheet'
import WeatherStats from './WeatherStats'

const BottomSheetWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
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
  max-height: ${({ isOpen }) => (isOpen ? '80vh' : '60px')};
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    padding 0.3s ease;
  position: relative;
`

const BottomSheet: FC = () => {
  const { isOpen, toggle } = useBottomSheet(false)

  return (
    <BottomSheetWrapper>
      <HandleButton onClick={toggle} aria-label="Toggle bottom sheet">
        {isOpen ? '▾' : '▴'}
      </HandleButton>

      <StyledBottomSheet isOpen={isOpen}>
        <WeatherStats isExpanded={isOpen} />
      </StyledBottomSheet>
    </BottomSheetWrapper>
  )
}

export default BottomSheet
