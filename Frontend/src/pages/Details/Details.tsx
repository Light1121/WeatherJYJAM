import type { FC } from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import LineChartBox from './_components/LineChartBox'
import { FullScreenLayout, MainLayout } from '../../_components'
import { usePinContext } from '@/_components/ContextHooks/usePinContext'

// ---------- Interfaces ----------
interface RawWeatherEntry {
  'Station Name': string
  Date: string
  'Rain 0900-0900 (mm)': number
  'Maximum Temperature (°C)': number
  'Minimum Temperature (°C)': number
  'Maximum Relative Humidity (%)': number
  'Minimum Relative Humidity (%)': number
  'Average 10m Wind Speed (m/sec)': number
}

interface FormattedWeatherData {
  date: string
  temperature: number
  humidity: number
  wind_speed: number
  precipitation: number
}

// ---------- Styled Components ----------
const DetailsContainer = styled.div`
  flex: 1;
  background-color: #f6fcff;
  padding: 2rem;
  margin: 1rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(32, 15, 15, 0.2);
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

// ---------- Component ----------

const TimeDisplay = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #007acc;
  background-color: #fffffff6;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`

// ---------- Main Component ----------
const Details: FC = () => {
  const [contentVisible, setContentVisible] = useState(false)
  const [timeValues, setTimeValues] = useState([0, 0, 0, 0])

  // ---------- Fade in ----------
  useEffect(() => {
    const fadeInContent = setTimeout(() => setContentVisible(true), 300)
    return () => clearTimeout(fadeInContent)
  }, [])

  // ---------- Time Slider Setup ----------
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

  // ---------- Fetch Weather Data ----------
  const { locationOnePin, locationTwoPin } = usePinContext()
  const selectedPin = locationOnePin ?? locationTwoPin
  const [, setLoading] = useState(false)
  const [, setError] = useState<string | null>(null)
  const [weatherData, setWeatherData] = useState<
    {
      date: string
      temperature: number
      humidity: number
      wind_speed: number
      precipitation: number
    }[]
  >([])

  useEffect(() => {
    if (!selectedPin) return

    const fetchWeatherData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Step 1: Get nearest station
        const nearestRes = await fetch(
          `http://127.0.0.1:2333/api/weather/nearest?lat=${selectedPin.position.lat}&lng=${selectedPin.position.lng}`,
        )
        if (!nearestRes.ok)
          throw new Error(
            `Failed to fetch nearest station: ${nearestRes.status}`,
          )
        const nearestJson = await nearestRes.json()
        if (nearestJson.status !== 'success')
          throw new Error(nearestJson.message)

        const stationName = nearestJson.data.station_name

        // Step 2: Get detailed weather data by station name
        const stationRes = await fetch(
          `http://127.0.0.1:2333/api/weather/${stationName}`,
        )
        if (!stationRes.ok)
          throw new Error(`Failed to fetch weather data: ${stationRes.status}`)
        const stationJson = await stationRes.json()
        if (stationJson.status !== 'success')
          throw new Error(stationJson.message)

        // Assume stationJson[0].data is an array of monthly data points
        const weather = stationJson[0].data

        // Format for LineChartBox: each entry must include date + 4 metrics
        // const formatted = weather.map((entry: RawWeatherEntry) => ({
        //   date: entry.date ?? entry.month ?? 'Unknown',
        //   temperature: entry.temperature,
        //   humidity: entry.humidity,
        //   wind_speed: entry.wind_speed,
        //   precipitation: entry.precipitation,
        // }))

        const formatted: FormattedWeatherData[] = weather.map(
          (entry: RawWeatherEntry) => ({
            date: entry['Date'],
            temperature: entry['Maximum Temperature (°C)'],
            humidity: entry['Maximum Relative Humidity (%)'],
            wind_speed: entry['Average 10m Wind Speed (m/sec)'],
            precipitation: entry['Rain 0900-0900 (mm)'],
          }),
        )

        setWeatherData(formatted)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError(String(err))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [selectedPin])

  // ---------- Graph Component ----------
  const GraphComponent: FC<{
    title: string
    graphIndex: number
    metric: 'temperature' | 'humidity' | 'wind_speed' | 'precipitation'
  }> = ({ title, graphIndex, metric }) => {
    return (
      <GraphSection>
        <GraphTitle>{title}</GraphTitle>
        <GraphBox>
          {/* Linechart box itself*/}
          {/* Find some way to pass in which parameter this linechartbox should show... e.g.precipitation data */}
          <LineChartBox metric={metric} data={weatherData} />

          {/* Now we only fetch once, but pass filtered data to each chart */}
          {/* <LineChartBox metric="wind_speed" data={weatherData} color="#007acc" />
          <LineChartBox metric="temperature" data={weatherData} color="#ff7300" />
          <LineChartBox metric="humidity" data={weatherData} color="#82ca9d" />
          <LineChartBox metric="precipitation" data={weatherData} color="#8884d8" /> */}
        </GraphBox>
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
  }

  // ---------- Main Render ----------
  return (
    <FullScreenLayout>
      <MainLayout>
        <DetailsContainer>
          <HeaderSection>
            <Title>Weather Data Analysis</Title>
          </HeaderSection>

          <FadeDiv visible={contentVisible} delay={200}>
            <ContentGrid>
              <GraphComponent
                title="Temperature Trends"
                graphIndex={0}
                metric="temperature"
              />
              <GraphComponent
                title="Humidity Patterns"
                graphIndex={1}
                metric="humidity"
              />
              <GraphComponent
                title="Wind Speed Analysis"
                graphIndex={2}
                metric="wind_speed"
              />
              <GraphComponent
                title="Precipitation Data"
                graphIndex={3}
                metric="precipitation"
              />
            </ContentGrid>
          </FadeDiv>
        </DetailsContainer>
      </MainLayout>
    </FullScreenLayout>
  )
}

export default Details
