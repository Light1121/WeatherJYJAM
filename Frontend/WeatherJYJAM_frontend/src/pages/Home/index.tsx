import type { FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../_components/Button'

const HomeContainer = styled.div``

const Title = styled.h1``

const TabBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 5px;
`

const TabButton = styled(Button)<{ $isActive?: boolean }>`
  background-color: ${(props) => (props.$isActive ? '#007acc' : '#f0f0f0')};
  color: ${(props) => (props.$isActive ? 'white' : 'black')};
  border-radius: 8px 8px 0 0;
  border: 1px solid #ccc;
  border-bottom: ${(props) =>
    props.$isActive ? '1px solid #007acc' : '1px solid #ccc'};
  min-width: 80px;

  &:hover {
    background-color: ${(props) => (props.$isActive ? '#005a9e' : '#e0e0e0')};
  }
`

const AddTabButton = styled(Button)`
  background-color: #f0f0f0;
  color: black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background-color: #e0e0e0;
  }
`

const ButtonGroup = styled.div`
  margin-bottom: 20px;
`

const ResetButton = styled(Button)`
  background-color: #ff4444;
  color: white;
  margin-left: 10px;

  &:hover {
    background-color: #cc0000;
  }
`

const Home: FC = () => {
  const { tabId } = useParams()
  const navigate = useNavigate()

  const [tabList, setTabList] = useState<string[]>(() => {
    const stored = localStorage.getItem('tabList')
    return stored ? JSON.parse(stored) : ['tab1', 'tab2']
  })

  const [maxTabNumber, setMaxTabNumber] = useState(() => {
    const stored = localStorage.getItem('maxTabNumber')
    return stored ? parseInt(stored) : 2
  })

  const saveTabList = (tabs: string[]) => {
    setTabList(tabs)
    localStorage.setItem('tabList', JSON.stringify(tabs))
  }

  useEffect(() => {
    if (tabId) {
      const currentTabNumber = parseInt(tabId.replace('tab', ''))
      if (currentTabNumber > maxTabNumber) {
        const newMax = currentTabNumber
        setMaxTabNumber(newMax)
        localStorage.setItem('maxTabNumber', newMax.toString())
      }

      if (!tabList.includes(tabId)) {
        const newTabList = [...tabList, tabId].sort((a, b) => {
          const numA = parseInt(a.replace('tab', ''))
          const numB = parseInt(b.replace('tab', ''))
          return numA - numB
        })
        saveTabList(newTabList)
      }
    }
  }, [tabId, maxTabNumber, tabList])

  const handleAddNewTab = () => {
    const newTabNumber = maxTabNumber + 1
    const newTabId = `tab${newTabNumber}`

    setMaxTabNumber(newTabNumber)
    localStorage.setItem('maxTabNumber', newTabNumber.toString())

    const newTabList = [...tabList, newTabId]
    saveTabList(newTabList)

    navigate(`/${newTabId}`)
  }

  const handleReset = () => {
    localStorage.removeItem('maxTabNumber')
    localStorage.removeItem('tabList')
    setMaxTabNumber(2)
    setTabList(['tab1', 'tab2'])
    navigate('/')
  }

  return (
    <>
      <HomeContainer>
        <Title>Home Map{tabId ? ` - ${tabId}` : ''}</Title>

        <TabBar>
          {tabList.map((tab) => (
            <TabButton
              key={tab}
              $isActive={tabId === tab}
              onClick={() => navigate(`/${tab}`)}
            >
              {tab}
            </TabButton>
          ))}
          <AddTabButton onClick={handleAddNewTab}>+</AddTabButton>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
        </TabBar>

        <ButtonGroup>
          <Button>Home</Button>
        </ButtonGroup>
      </HomeContainer>
    </>
  )
}

export default Home
