import styled from 'styled-components'

// Layout
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: sans-serif;
  background: #ffffff;
  color: #111111;
`

export const Page = styled.div`
  display: flex;
  flex: 1;
`

export const Sidebar = styled.div`
  width: 240px;
  background: #def8ff;    
  padding: 20px 30px 15px; /* space at top */
  color: black;
`

export const SidebarItem = styled.div<{ active?: boolean }>`
  margin: 20px 0;
  padding: 20px 16px;
  border-radius: 8px;
  cursor: pointer;
  background: ${(p) => (p.active ? '#b5ecfcff' : 'transparent')};
  color: ${(p) => (p.active ? '#000000ff' : '#444')};
  font-weight: ${(p) => (p.active ? '600' : '400')};
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: #b5ecfcff;
    color: #111111;
  }
`

export const Content = styled.div`
  flex: 1;
  padding: 32px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

// Card wrapper for each section
export const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  width: 100%;

`

// Form styling
export const Label = styled.label`
  display: block;
  margin: 12px 0 4px;
  font-weight: 500;
`

export const Input = styled.input`
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 0 12px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
`

export const FileInput = styled.input`
  margin: 12px 0;
`

export const ProfileImage = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin: 12px 0;
  border: 2px solid #ccc;
`

// Privacy card (inner card look)
export const PrivacyCard = styled.div`
  background: #f1f5f9;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 20px;
  margin-top: 12px;
  font-size: 0.95rem;
  line-height: 1.5;
`
