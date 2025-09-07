import type { FC, ChangeEvent, FormEvent } from 'react'
import { useState, useEffect } from 'react'
import Button from '../../_components/Button'
import Header from './Header/Header'

import {
  Container,
  Page,
  Sidebar,
  SidebarItem,
  Content,
  Card,
  Label,
  Input,
  FileInput,
  ProfileImage,
  PrivacyCard,
} from './Settings.styles'

const Settings: FC = () => {
  const [activeSection, setActiveSection] = useState('Profile')

  // Profile state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [profilePic, setProfilePic] = useState<string | null>(null)

  // Language state
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang) setLanguage(savedLang)
  }, [])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Profile Updated:', {
      email,
      password,
      newPassword,
      profilePic,
    })
  }

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePic(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Container>
      {/* Top Header */}
      <Header />

      {/* Main Page Layout */}
      <Page>
        {/* Sidebar */}
        <Sidebar>
          <h2>Settings</h2>
          <SidebarItem
            active={activeSection === 'Profile'}
            onClick={() => setActiveSection('Profile')}
          >
            Profile
          </SidebarItem>
          <SidebarItem
            active={activeSection === 'Privacy'}
            onClick={() => setActiveSection('Privacy')}
          >
            Privacy
          </SidebarItem>
          <SidebarItem
            active={activeSection === 'Accessibility'}
            onClick={() => setActiveSection('Accessibility')}
          >
            Accessibility
          </SidebarItem>
          <SidebarItem
            active={activeSection === 'UserGuide'}
            onClick={() => setActiveSection('UserGuide')}
          >
            User Guide
          </SidebarItem>
        </Sidebar>

        {/* Content */}
        <Content>
          {activeSection === 'Profile' && (
            <Card>
              <h1>Profile Settings</h1>
              <form onSubmit={handleSubmit}>
                <Label>Profile Picture</Label>
                {profilePic && (
                  <ProfileImage src={profilePic} alt="Profile Preview" />
                )}
                <FileInput
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                />

                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />

                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />

                <Label>Change Password</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewPassword(e.target.value)
                  }
                />

                <Button type="submit">Update</Button>
              </form>
            </Card>
          )}

          {activeSection === 'Privacy' && (
            <Card>
              <h1>Privacy</h1>
              <PrivacyCard>
                <p>
                  We value your privacy. Your personal information is securely
                  stored and never shared with third parties without your
                  consent.
                </p>
              </PrivacyCard>
            </Card>
          )}

          {activeSection === 'Accessibility' && (
            <Card>
              <h1>Accessibility</h1>
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                value={language}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setLanguage(e.target.value)
                }
                style={{
                  padding: '12px 12px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  marginTop: '12px',
                  marginBottom: '12px',
                  maxWidth: '400px',
                  width: '100%',
                }}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
                <option value="vi">Tiếng Việt</option>
              </select>
              <p>
                Selected language: <strong>{language}</strong>
              </p>
            </Card>
          )}

          {activeSection === 'UserGuide' && (
            <Card>
              <h1>User Guide</h1>
              <p>Help and documentation goes here.</p>
            </Card>
          )}
        </Content>
      </Page>
    </Container>
  )
}

export default Settings
