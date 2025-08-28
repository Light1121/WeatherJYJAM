import type { FC } from 'react'
import styled from 'styled-components'
import Header from './Header'
import FavouriteComparisons from './FavouriteComparisons'
import FavouriteLocations from './FavouriteLocations'

const ProfileContainer = styled.div`
  min-height: 100vh;
  background-color: #f6fcff;
  padding: 3rem;
  margin: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`

const ContentGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const Profile: FC = () => (
  <ProfileContainer>
    <Header />
    <ContentGrid>
      <FavouriteLocations />
      <FavouriteComparisons />
    </ContentGrid>
  </ProfileContainer>
)

export default Profile
