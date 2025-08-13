import type { FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'

const HomeContainer = styled.div``

const Title = styled.h1``

const ButtonGroup = styled.div`
  margin-bottom: 20px;
`

const Spacer = styled.span`
  margin: 0 10px;
`

const Home: FC = () => {
  const { tabId } = useParams()
  const navigate = useNavigate()

  return (
    <HomeContainer>
      <Title>Home Map {tabId ? `- Tab: ${tabId}` : ''}</Title>
      
      <ButtonGroup>
        <Button onClick={() => navigate('/tab1')}>tab1</Button>
        <Spacer />
        <Button onClick={() => navigate('/tab2')}>+</Button>
      </ButtonGroup>
      
      <Button>Home</Button>
    </HomeContainer>
  )
}

export default Home
