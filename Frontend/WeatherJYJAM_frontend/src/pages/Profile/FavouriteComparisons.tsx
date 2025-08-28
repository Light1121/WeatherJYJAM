import type { FC } from 'react'
import styled from 'styled-components'

const Section = styled.div`
  background-color: #C2E9FF; 
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`

const Item = styled.div`
  background-color: #fffffff6;
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
`

const FavouriteComparisons: FC = () => (
  <Section>
    <Title>Favourite Comparisons</Title>
    <Grid>
      <Item>Comparison 1</Item>
      <Item>Comparison 2</Item>
      <Item>Comparison 3</Item>
      <Item>Comparison 4</Item>
      <Item>Comparison 5</Item>
    </Grid>
  </Section>
)

export default FavouriteComparisons
