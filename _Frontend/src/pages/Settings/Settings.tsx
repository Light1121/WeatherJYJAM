import type { FC } from 'react'
import styled from 'styled-components'
import Button from '../../_components/Button'
import FullScreenLayout from '../../_components/FullScreenLayout'
import MainLayout from '../../_components/MainLayout'

const SettingsContainer = styled.div`
  padding: 2rem;
`

const Title = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
`

const Settings: FC = () => (
  <FullScreenLayout>
    <MainLayout>
      <SettingsContainer>
        <Title>Settings</Title>
        <Button>Settings</Button>
      </SettingsContainer>
    </MainLayout>
  </FullScreenLayout>
)

export default Settings
