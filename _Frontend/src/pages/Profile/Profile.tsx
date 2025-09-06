import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from './_components/Header'
import FavouriteComparisons from './_components/FavouriteComparisons'
import FavouriteLocations from './_components/FavouriteLocations'

const ProfileContainer = styled.div`
  min-height: 100vh;
  background-color: #f6fcff;
  padding: 3rem;
  margin: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`

const FadeDiv = styled.div<{ visible: boolean; delay?: number }>`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease ${({ delay }) => (delay ? `${delay}ms` : '0ms')};
`

const EmailText = styled.span`
  display: block;
  margin: 1.5rem;
  font-size: 0.95rem;
  color: #333;
  font-family: 'Instrument Sans', sans-serif;
`

const ContentGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const Profile: FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [emailVisible, setEmailVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [navigatePath, setNavigatePath] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fadeInHeader = setTimeout(() => setHeaderVisible(true), 10)
    const fadeInEmail = setTimeout(() => setEmailVisible(true), 400)
    const fadeInContent = setTimeout(() => setContentVisible(true), 600)

    return () => {
      clearTimeout(fadeInHeader)
      clearTimeout(fadeInEmail)
      clearTimeout(fadeInContent)
    }
  }, [])

  useEffect(() => {
    if (!leaving || !navigatePath) return

    setContentVisible(false)
    const fadeEmail = setTimeout(() => setEmailVisible(false), 500)
    const fadeHeader = setTimeout(() => setHeaderVisible(false), 1000)
    const doNavigate = setTimeout(() => navigate(navigatePath), 1500)

    return () => {
      clearTimeout(fadeEmail)
      clearTimeout(fadeHeader)
      clearTimeout(doNavigate)
    }
  }, [leaving, navigatePath, navigate])

  const leavePage = (path: string) => {
    setNavigatePath(path)
    setLeaving(true)
  }

  return (
    <ProfileContainer>
      <FadeDiv visible={headerVisible}>
        <Header onLeave={leavePage} />
      </FadeDiv>

      <FadeDiv visible={emailVisible} delay={100}>
        <EmailText>Email | username@gmail.com</EmailText>
      </FadeDiv>

      <FadeDiv visible={contentVisible} delay={200}>
        <ContentGrid>
          <FavouriteLocations />
          <FavouriteComparisons />
        </ContentGrid>
      </FadeDiv>
    </ProfileContainer>
  )
}

export default Profile
