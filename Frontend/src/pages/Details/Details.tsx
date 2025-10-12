import type { FC } from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import LineChartBox from './_components/LineChartBox'
import { FullScreenLayout, MainLayout } from '@/_components'
import { usePinContext } from '@/_components/ContextHooks/usePinContext'
import type { RawWeatherEntry, FormattedWeatherData } from '@/pages/Details/_components/types'



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

const FadeDiv = styled.div<{ $visible: boolean; $delay?: number }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.5s ease ${({ $delay }) => ($delay ? `${$delay}ms` : '0ms')};
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
  width: 500px;
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

const Spinner = styled.div`
  border: 4px solid #eee;
  border-top: 4px solid #007acc;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
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
  // Generate time options from 01-2015 to 12-2024
  const generateTimeOptions = () => {
    const options = []
    for (let year = 2015; year <= 2024; year++) {
      options.push({
          value: `${year}`,
          index: options.length,
        })

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

        const stationName = nearestJson.data['Station Name']



        // Step 2: Get detailed weather data by station name
        const stationRes = await fetch(
          `http://127.0.0.1:2333/api/weather/avg_${stationName}`,
        )
        if (!stationRes.ok)
          throw new Error(`Failed to fetch weather data: ${stationRes.status}`)
        const stationJson = await stationRes.json()

        if (stationJson.length === 0)
          throw new Error("Failed to retrieve weather data")


        // Transform the data
        const formatted: FormattedWeatherData[] = stationJson.map(
          (entry: RawWeatherEntry) => ({
            date: entry['Date'] ?? 'Unknown',
            temperature: Number(entry['Avg_Temperature']) ?? null,
            humidity: Number(entry['Avg_Relative_Humidity']) ?? null,
            wind_speed: Number(entry['Avg_Wind_Speed']) ?? null,
            precipitation: Number(entry['Avg_Rainfall']) ?? null,
          }),
        )

        // console.log('Sample stationJson entry:', stationJson[0]);
        // console.log('Keys:', Object.keys(stationJson[0]));

        setWeatherData(formatted)

        console.log(' Weather data received:', weatherData)
        if (Array.isArray(weatherData)) {
          console.log(' Array length:', weatherData.length)
          console.log(' First item:', weatherData[0])
        }
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
      const selectedYear = timeOptions[timeValues[graphIndex]]?.value

      // Filter the weatherData for this graph's selected year
      const filteredData = weatherData.filter((entry) => {
        const year = entry.date.split('-')[0] 
        return year === selectedYear.toString()
      })

      
    return (
      <GraphSection>
        <GraphTitle>{title}</GraphTitle>
        <GraphBox>
          {/* Linechart box itself*/}
          {loading ? (
            <div>
              <Spinner />
              <p style={{ textAlign: 'center', fontWeight: 500, color: '#007acc' }}>
              Loading weather data...
            </p>
            </div>           
          ) : error ? (
            <p style={{ textAlign: 'center', color: 'red' }}>
              Error: {error}
            </p>
          ) : (
            <div>
            <LineChartBox metric={metric} data={filteredData} />
            </div>
          )}

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
            {timeOptions[timeValues[graphIndex]]?.value || '2024'}
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

          <FadeDiv $visible={contentVisible} $delay={200}>
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
