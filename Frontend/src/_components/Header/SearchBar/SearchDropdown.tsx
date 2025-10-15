import type { FC } from 'react'
import styled from 'styled-components'
import { useSearch } from './_hooks'

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

const LoadingText = styled.div`
  padding: 12px 0;
  color: #666;
  text-align: center;
`

interface SearchDropdownProps {
  query: string
  onSelect: (loc: { title: string; subtitle: string }) => void
  inputWidth: number
}

const SearchDropdown: FC<SearchDropdownProps> = ({
  query,
  onSelect,
  inputWidth,
}) => {
  const { results, loading, error } = useSearch(query)

  if (loading) {
    return (
      <Container width={inputWidth}>
        <LoadingText>Searching...</LoadingText>
      </Container>
    )
  }

  if (error) {
    return (
      <Container width={inputWidth}>
        <LoadingText>{error}</LoadingText>
      </Container>
    )
  }

  if (results.length === 0) {
    return (
      <Container width={inputWidth}>
        <LoadingText>No stations found</LoadingText>
      </Container>
    )
  }

  return (
    <Container width={inputWidth}>
      {results.map((result, index) => {
        // Split "Station Name, State" format
        const parts = result.split(', ')
        const title = parts[0] || result
        const subtitle = parts[1] || ''

        return (
          <ResultItem
            key={`${result}-${index}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelect({ title, subtitle })}
          >
            {result}
          </ResultItem>
        )
      })}
    </Container>
  )
}

export default SearchDropdown
