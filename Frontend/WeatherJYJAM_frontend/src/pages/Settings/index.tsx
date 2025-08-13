import type { FC } from 'react'
import styled from 'styled-components'
import Button from '../../_components/Button'

const SettingsContainer = styled.div``

const Title = styled.h1``

const Settings: FC = () => (
  <SettingsContainer>
    <Title>Settings</Title>
    <Button>Settings</Button>
  </SettingsContainer>
)

export default Settings
