import type { FC } from 'react'
import Button from '../../../../../../../_components/Button'

interface AddTabButtonProps {
  onClick: () => void
}

const AddTabButton: FC<AddTabButtonProps> = ({ onClick }) => (
  <Button onClick={onClick}>+</Button>
)

export default AddTabButton
