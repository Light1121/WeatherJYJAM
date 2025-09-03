import type { FC } from 'react'
import { styled } from 'styled-components'
import useBottomSheet from './_hooks/useBottomSheet'
import WeatherStats from './WeatherStats'

const StyledBottomSheet = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 400;
  background: white;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px 20px;
  width: min(92vw, 980px);
`

const HandleButton = styled.button`
  position: absolute;
  cursor: pointer;
  top: -35px;
  width: 60px;
  height: 28px;
  border-radius: 20%;
  border: 1px solid #ddd;
  background: white;
`

const Page = styled.div`
  display: grid;
  gap: 16px;
  position: relative;
`

const BottomSheet: FC = () => {
  const { isOpen, toggle } = useBottomSheet(true)

  return (
    <StyledBottomSheet>
      <Page>
        <HandleButton
          onClick={toggle}
          aria-expanded={isOpen}
          aria-label="Toggle bottom sheet"
        >
          {isOpen ? '▴' : '▾'}
        </HandleButton>

        <WeatherStats isExpanded={isOpen} />
      </Page>
    </StyledBottomSheet>
  )
}

export default BottomSheet
