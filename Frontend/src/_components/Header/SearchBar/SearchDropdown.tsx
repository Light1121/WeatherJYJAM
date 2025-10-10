import type { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  min-width: 660px;
  max-width: 720px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #eaeaea;
  padding: 12px 0;
  max-height: 520px;
  overflow-y: auto;
  z-index: 100000;
`

const ResultItem = styled.div`
  padding: 14px 18px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: 'Instrument Sans', sans-serif;

  &:hover {
    background-color: #f5f5f5;
  }
`

const ItemTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`

const ItemSubtitle = styled.div`
  font-size: 12px;
  color: #666;
`

// Dummy search results
const dummyResults = [
  { id: 1, title: 'Sydney, Australia', subtitle: 'New South Wales' },
  { id: 2, title: 'Melbourne, Australia', subtitle: 'Victoria' },
  { id: 3, title: 'Brisbane, Australia', subtitle: 'Queensland' },
  { id: 4, title: 'Perth, Australia', subtitle: 'Western Australia' },
  { id: 5, title: 'Adelaide, Australia', subtitle: 'South Australia' },
]

const renderResults = () => {
  return dummyResults.map((result) => (
    <ResultItem key={result.id}>
      <ItemTitle>{result.title}</ItemTitle>
      <ItemSubtitle>{result.subtitle}</ItemSubtitle>
    </ResultItem>
  ))
}

const SearchDropdown: FC = () => {
  return <Container>{renderResults()}</Container>
}

export default SearchDropdown
