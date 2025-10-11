import type { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div<{ width: number }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: ${({ width }) => width}px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #eaeaea;
  padding: 12px 16px;
  max-height: 520px;
  overflow-y: auto;
  font-family: 'Instrument Sans', sans-serif;
  white-space: pre-wrap;
  line-height: 1.6;
  z-index: 1000;
`

const ResultItem = styled.div`
  padding: 12px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`

interface SearchDropdownProps {
  query: string
  onSelect: (loc: { id: number; title: string; subtitle: string }) => void
  inputWidth: number
}

const dummyResults = [
  { id: 1, title: 'Sydney, Australia', subtitle: 'New South Wales' },
  { id: 2, title: 'Melbourne, Australia', subtitle: 'Victoria' },
  { id: 3, title: 'Brisbane, Australia', subtitle: 'Queensland' },
  { id: 4, title: 'Perth, Australia', subtitle: 'Western Australia' },
  { id: 5, title: 'Adelaide, Australia', subtitle: 'South Australia' },
]

const SearchDropdown: FC<SearchDropdownProps> = ({
  query,
  onSelect,
  inputWidth,
}) => {
  const results = dummyResults.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase()),
  )

  if (results.length === 0) {
    return <Container width={inputWidth}>No search results</Container>
  }

  return (
    <Container width={inputWidth}>
      {results.map((r) => (
        <ResultItem
          key={r.id}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onSelect(r)}
        >
          {r.title} - {r.subtitle}
        </ResultItem>
      ))}
    </Container>
  )
}

export default SearchDropdown
