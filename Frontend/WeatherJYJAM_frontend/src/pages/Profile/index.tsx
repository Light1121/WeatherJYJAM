import type { FC } from "react";
import styled from "styled-components";
import Header from "./Header";
import FavouriteComparisons from "./FavouriteComparisons";
import FavouriteLocations from "./FavouriteLocations";

const ProfileContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem;
`;

const ContentGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Profile: FC = () => (
  <ProfileContainer>
    <Header />
    <ContentGrid>
      <FavouriteLocations />
      <FavouriteComparisons />
    </ContentGrid>
  </ProfileContainer>
);

export default Profile;
