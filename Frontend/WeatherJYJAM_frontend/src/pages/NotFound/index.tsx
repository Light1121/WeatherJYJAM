import type { FC } from 'react'
import styled from 'styled-components'
import Button from '../../_components/Button'

const NotFoundContainer = styled.div``

const Title = styled.h1``

const NotFound: FC = () => (
  <NotFoundContainer>
    <Title>NotFound</Title>
    <Button>NotFound</Button>
  </NotFoundContainer>
)

export default NotFound
