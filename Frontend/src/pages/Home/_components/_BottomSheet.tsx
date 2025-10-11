import type { FC } from 'react'
import { styled } from 'styled-components'

const StyledBottomSheet = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 12px 20px;
`

const BottomSheet: FC = () => (
  <StyledBottomSheet>
    <div>↑ BottomSheetTEST</div>
  </StyledBottomSheet>
)

export default BottomSheet
