import type { FC } from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FullScreenLayout, MainLayout } from '../../_components'
import FavouriteComparisons from './_components/FavouriteComparisons'
import FavouriteLocations from './_components/FavouriteLocations'

const ProfileContainer = styled.div`
  flex: 1;
  background-color: #f6fcff;
  padding: 2rem;
  margin: 1rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  overflow: auto;
`

const FadeDiv = styled.div<{ visible: boolean; delay?: number }>`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease ${({ delay }) => (delay ? `${delay}ms` : '0ms')};
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background-color: #c2e9ff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 2rem;
  font-family: 'Instrument Sans', sans-serif;
`

const Circle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #256392ff;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const WelcomeText = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`

const EmailText = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
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
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    const fadeInContent = setTimeout(() => setContentVisible(true), 300)
    return () => clearTimeout(fadeInContent)
  }, [])

  return (
    <FullScreenLayout>
      <MainLayout>
        <ProfileContainer>
          <UserSection>
            <Circle />
            <UserInfo>
              <WelcomeText>Hello, Username</WelcomeText>
              <EmailText>username@gmail.com</EmailText>
            </UserInfo>
          </UserSection>

          <FadeDiv visible={contentVisible} delay={200}>
            <ContentGrid>
              <FavouriteLocations />
              <FavouriteComparisons />
            </ContentGrid>
          </FadeDiv>
        </ProfileContainer>
      </MainLayout>
    </FullScreenLayout>
  )
}

export default Profile
