import type { FC } from 'react'
import styled from 'styled-components'
import Button from '../../_components/Button'

const ProfileContainer = styled.div``

const Title = styled.h1``

const Profile: FC = () => (
  <ProfileContainer>
    <Title>Profile</Title>
    <Button>Profile</Button>
  </ProfileContainer>
)

export default Profile
