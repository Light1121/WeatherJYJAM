import type { FC } from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FullScreenLayout, MainLayout } from '../../_components'

const DetailsContainer = styled.div`
  flex: 1;
  background-color: #f6fcff;
  padding: 2rem;
  margin: 1rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  overflow: auto;
`

const FadeDiv = styled.div<{ visible: boolean; delay?: number }>`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease ${({ delay }) => (delay ? `${delay}ms` : '0ms')};
`

const HeaderSection = styled.div`
  padding: 1rem 2rem;
  background-color: #c2e9ff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 2rem;
  font-family: 'Instrument Sans', sans-serif;
  text-align: center;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`

const ContentGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const GraphSection = styled.div`
  background-color: #c2e9ff;
  border-radius: 1rem;
  padding: 1rem 1.5rem 2.5rem 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Instrument Sans', sans-serif;
`

const GraphTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
`

const GraphBox = styled.div`
  background-color: #fffffff6;
  border: 1px dashed #ddd;
  border-radius: 10px;
  min-height: 250px;
  display: grid;
  place-items: center;
  color: #666;
  font-size: 14px;
  margin-bottom: 1rem;
`

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`

const SliderLabel = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
  color: #333;
`

const TimeSlider = styled.input`
  width: 100%;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  outline: none;
  appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    background: #007acc;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: #007acc;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
`

const TimeDisplay = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #007acc;
  background-color: #fffffff6;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`

const Details: FC = () => {
  const [contentVisible, setContentVisible] = useState(false)
  const [timeValues, setTimeValues] = useState([0, 0, 0, 0])

  useEffect(() => {
    const fadeInContent = setTimeout(() => setContentVisible(true), 300)
    return () => clearTimeout(fadeInContent)
  }, [])

  // Generate time options from 01-2020 to 12-2024
  const generateTimeOptions = () => {
    const options = []
    for (let year = 2020; year <= 2024; year++) {
      for (let month = 1; month <= 12; month++) {
        options.push({
          value: `${month.toString().padStart(2, '0')}-${year}`,
          index: options.length,
        })
      }
    }
    return options
  }

  const timeOptions = generateTimeOptions()

  const handleSliderChange = (graphIndex: number, value: number) => {
    const newValues = [...timeValues]
    newValues[graphIndex] = value
    setTimeValues(newValues)
  }

  const GraphComponent: FC<{ title: string; graphIndex: number }> = ({
    title,
    graphIndex,
  }) => (
    <GraphSection>
      <GraphTitle>{title}</GraphTitle>
      <GraphBox>Graph {graphIndex + 1} goes here</GraphBox>
      <SliderContainer>
        <SliderLabel>Time Period</SliderLabel>
        <TimeSlider
          type="range"
          min={0}
          max={timeOptions.length - 1}
          value={timeValues[graphIndex]}
          onChange={(e) =>
            handleSliderChange(graphIndex, parseInt(e.target.value))
          }
        />
        <TimeDisplay>
          {timeOptions[timeValues[graphIndex]]?.value || '01-2020'}
        </TimeDisplay>
      </SliderContainer>
    </GraphSection>
  )

  return (
    <FullScreenLayout>
      <MainLayout>
        <DetailsContainer>
          <HeaderSection>
            <Title>Weather Data Analysis</Title>
          </HeaderSection>

          <FadeDiv visible={contentVisible} delay={200}>
            <ContentGrid>
              <GraphComponent title="Temperature Trends" graphIndex={0} />
              <GraphComponent title="Humidity Patterns" graphIndex={1} />
              <GraphComponent title="Wind Speed Analysis" graphIndex={2} />
              <GraphComponent title="Precipitation Data" graphIndex={3} />
            </ContentGrid>
          </FadeDiv>
        </DetailsContainer>
      </MainLayout>
    </FullScreenLayout>
  )
}

export default Details
