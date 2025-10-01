import React, { useState } from 'react'
import styled from 'styled-components'

const Section = styled.div`
  background-color: #c2e9ff;
  border-radius: 1rem;
  padding: 1rem 1.5rem 2.5rem 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Instrument Sans', sans-serif;
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`

const FormField = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-family: 'Instrument Sans', sans-serif;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: 'Instrument Sans', sans-serif;
  background-color: #fffffff6;

  &:focus {
    outline: none;
    border-color: #007acc;
  }
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: 'Instrument Sans', sans-serif;
  background-color: #fffffff6;

  &:focus {
    outline: none;
    border-color: #007acc;
  }
`

const FileInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: 'Instrument Sans', sans-serif;
  background-color: #fffffff6;
`

const FileName = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #666;
  font-family: 'Instrument Sans', sans-serif;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-family: 'Instrument Sans', sans-serif;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #005f99;
  }
`

const ProfileSettings: React.FC = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [colorScale, setColorScale] = useState('default')

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0])
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleColorScaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColorScale(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit logic here
  }

  return (
    <Section>
      <Title>Profile Settings</Title>
      <form onSubmit={handleSubmit}>
        {/* Change Profile Picture */}
        <FormField>
          <Label>Change Profile Picture:</Label>
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
          {profilePic && <FileName>Selected: {profilePic.name}</FileName>}
        </FormField>

        {/* Change Username */}
        <FormField>
          <Label>Change Username:</Label>
          <Input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter new username"
          />
        </FormField>

        {/* Change Email */}
        <FormField>
          <Label>Change Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter new email"
          />
        </FormField>

        {/* Change Password */}
        <FormField>
          <Label>Change Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
          />
        </FormField>

        {/* Color Scale */}
        <FormField>
          <Label>Color Scale:</Label>
          <Select value={colorScale} onChange={handleColorScaleChange}>
            <option value="default">Default</option>
            <option value="warm">Warm</option>
            <option value="cool">Cool</option>
            <option value="grayscale">Grayscale</option>
          </Select>
        </FormField>

        <SubmitButton type="submit">Save Changes</SubmitButton>
      </form>
    </Section>
  )
}

export default ProfileSettings
