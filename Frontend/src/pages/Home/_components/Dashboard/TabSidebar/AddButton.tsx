import styled from 'styled-components'

interface AddButtonProps {
  onClick: () => void
  $color?: string
  $textColor?: string
}

const AddButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`

const AddButton = styled.button<AddButtonProps>`
  background: ${({ $color }) => $color || '#fffafa'};
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: ${({ $textColor }) => $textColor || '#797878ff'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.2s ease,
    transform 0.1s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:hover + div {
    opacity: 1;
    visibility: visible;
    transform: translateX(10px);
  }
`
const Tooltip = styled.div<{ $color?: string }>`
  position: absolute;
  left: 60px;
  top: 10%;
  transform: translateY(-50%) translateX(0);
  background: ${({ $color }) => $color || '#fffafa'};
  padding: 12px 12px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;
  color: #797878ff;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  pointer-events: none;
  z-index: 1001;
`

export const AddButtonWithTooltip: React.FC<AddButtonProps> = ({
  onClick,
  $color,
  $textColor,
}) => (
  <AddButtonWrapper>
    <AddButton onClick={onClick} $color={$color} $textColor={$textColor}>
      +
    </AddButton>
    <Tooltip $color={$color}>Create New Comparison</Tooltip>
  </AddButtonWrapper>
)
