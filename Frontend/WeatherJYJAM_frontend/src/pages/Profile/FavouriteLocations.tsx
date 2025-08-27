import type { FC } from 'react'
import styled from 'styled-components'

const Section = styled.div`
  background-color: #c5f1f3ff; 
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const List = styled.ul`
  padding-left: 1.25rem;
  list-style: disc;
`

const FavouriteLocations: FC = () => (
  <Section>
    <Title>Favourite Locations</Title>
    <List>
      <li>Location</li>
      <li>Location</li>
      <li>Location</li>
    </List>
  </Section>
)

export default FavouriteLocations
