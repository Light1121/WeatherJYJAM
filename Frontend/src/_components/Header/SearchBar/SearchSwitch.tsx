import type { FC } from 'react'
import styled from 'styled-components'

type Mode = 'search' | 'ai'

interface SearchSwitchProps {
  mode: Mode
  onModeChange: (mode: Mode) => void
}

const Container = styled.div`
  display: inline-flex;
  background: #f5f5f5;
  border-radius: 22px;
  padding: 3px;
`

const Option = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 14px;
  border-radius: 18px;
  font-size: 14px;
  background: ${({ $active }) => ($active ? '#ffffff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#000000d9' : '#00000073')};
  box-shadow: ${({ $active }) =>
    $active ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'};
  transition: all 0.3s;
  user-select: none;

  &:hover {
    color: #000000d9;
  }
`

const Icon = styled.span`
  font-size: 18px;
  line-height: 1;
`

const Text = styled.span`
  line-height: 1;
`

const SearchSwitch: FC<SearchSwitchProps> = ({ mode, onModeChange }) => {
  return (
    <Container>
      <Option
        $active={mode === 'search'}
        onClick={() => onModeChange('search')}
      >
        <Icon>🔍</Icon>
        <Text>Search</Text>
      </Option>
      <Option $active={mode === 'ai'} onClick={() => onModeChange('ai')}>
        <Icon>🤖</Icon>
        <Text>AI</Text>
      </Option>
    </Container>
  )
}

export default SearchSwitch
