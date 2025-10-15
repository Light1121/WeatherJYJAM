import type { FC } from 'react'
import { styled } from 'styled-components'
import { TemperatureBar, WindBar, HumidityBar } from '@/_components'
import { useNavigate } from 'react-router-dom'
import { usePinContext } from '@/_components/ContextHooks/usePinContext'
import { useControlPanelContext } from '@/_components/ContextHooks/useControlPanelContext'
import type { WeatherData } from '@/_components/ContextHooks/contexts'

const Spacer = styled.div`
  height: 10px;
`
const HeaderRow = styled.div`
  display: flex;
  font-family: 'Instrument Sans', sans-serif;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`

const Location = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  font-family: 'Instrument Sans', sans-serif;
`

const NowTemp = styled.div`
  font-size: 18px;
  font-family: 'Instrument Sans', sans-serif;
  font-weight: 600;
`

const BarsRow = styled.div`
  display: grid;
  font-family: 'Instrument Sans', sans-serif;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
`

const SectionTitle = styled.h4`
  margin: 4px 0;
  font-size: 16px;
  font-family: 'Instrument Sans', sans-serif;
`

const GraphButton = styled.button<{ tall?: boolean }>`
  display: grid;
  place-items: center;
  padding: 8px;
  border: 1px solid #007acc;
  border-radius: 10px;
  min-height: ${(props) => (props.tall ? '10px' : '20px')};
  color: #007acc;
  background-color: #f6fcff;
  font-size: 14px;
  font-family: 'Instrument Sans', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #007acc;
    color: white;
  }
`

const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`
const NoDataMessage = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;
  text-align: center;
  color: #666;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 16px;
`

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007acc;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  color: #666;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;
`

interface WeatherStatsProps {
  isExpanded?: boolean
}

const WeatherStats: FC<WeatherStatsProps> = ({ isExpanded = true }) => {
  const { locationOnePin, locationTwoPin } = usePinContext()
  const { getBarStyle } = useControlPanelContext()
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate('/details')
  }

  // Check if we have any pins
  const hasLocationOne = locationOnePin !== null
  const hasLocationTwo = locationTwoPin !== null

  const barStyle = getBarStyle()

  // Helper function to render weather bars with individual styling
  const renderWeatherBars = (weatherData: WeatherData) => {
    if (weatherData.isLoading) {
      return (
        <LoadingContainer>
          <LoadingSpinner />
          <span>Loading weather data...</span>
        </LoadingContainer>
      )
    }

    return (
      <>
        <TemperatureBar
          valuePosition={Math.max(
            0,
            Math.min(100, weatherData.temperature + 45),
          )}
          customStyle={barStyle}
        />
        <WindBar
          valuePosition={Math.max(0, Math.min(100, weatherData.windSpeed + 35))}
          customStyle={barStyle}
        />
        <HumidityBar
          valuePosition={Math.max(0, Math.min(100, weatherData.humidity))}
          customStyle={barStyle}
        />
      </>
    )
  }

  return (
    <>
      {/* Only one location selected */}
      {((hasLocationOne && !hasLocationTwo) ||
        (!hasLocationOne && hasLocationTwo)) && (
        <>
          <HeaderRow>
            <div
              style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}
            >
              {hasLocationOne && locationOnePin && (
                <>
                  <Location>{locationOnePin.locationName}</Location>
                  <NowTemp>
                    {locationOnePin.weatherData?.temperature || 0}°C
                  </NowTemp>
                </>
              )}
              {hasLocationTwo && locationTwoPin && (
                <>
                  <Location>{locationTwoPin.locationName}</Location>
                  <NowTemp>
                    {locationTwoPin.weatherData?.temperature || 0}°C
                  </NowTemp>
                </>
              )}
            </div>
          </HeaderRow>
          {isExpanded && (
            <>
              <BarsRow>
                {hasLocationOne &&
                  locationOnePin?.weatherData &&
                  renderWeatherBars(locationOnePin.weatherData)}
                {hasLocationTwo &&
                  locationTwoPin?.weatherData &&
                  renderWeatherBars(locationTwoPin.weatherData)}
              </BarsRow>

              <Spacer />

              <div>
                <SectionTitle>Past Weather Report</SectionTitle>
                <GraphButton
                  onClick={handleViewDetails}
                  style={{ width: '100%', marginTop: '12px' }}
                >
                  Click to view detailed graphs
                </GraphButton>
              </div>
            </>
          )}
        </>
      )}

      {/* Both Locations Selected */}
      {hasLocationOne && hasLocationTwo && locationOnePin && locationTwoPin && (
        <>
          <TwoColumn>
            {/* Location 1 */}
            <div>
              <HeaderRow>
                <Location>{locationOnePin.locationName}</Location>
                <NowTemp>
                  {locationOnePin.weatherData?.temperature || 0}°C
                </NowTemp>
              </HeaderRow>
              {isExpanded && locationOnePin.weatherData && (
                <BarsRow>
                  {renderWeatherBars(locationOnePin.weatherData)}
                </BarsRow>
              )}
            </div>

            {/* Location 2 */}
            <div>
              <HeaderRow>
                <Location>{locationTwoPin.locationName}</Location>
                <NowTemp>
                  {locationTwoPin.weatherData?.temperature || 0}°C
                </NowTemp>
              </HeaderRow>
              {isExpanded && locationTwoPin.weatherData && (
                <BarsRow>
                  {renderWeatherBars(locationTwoPin.weatherData)}
                </BarsRow>
              )}
            </div>
          </TwoColumn>

          {isExpanded && (
            <div style={{ width: '100%' }}>
              <Spacer />
              <SectionTitle
                style={{ textAlign: 'center', margin: '20px 0 16px 0' }}
              >
                Past Weather Report
              </SectionTitle>
              <GraphButton
                onClick={handleViewDetails}
                style={{ width: '100%', marginTop: '16px' }}
              >
                Click to view detailed graphs
              </GraphButton>
            </div>
          )}
        </>
      )}

      {/* No Locations Selected */}
      {!hasLocationOne && !hasLocationTwo && (
        <NoDataMessage>
          Click on the map to add location pins and view weather data.
        </NoDataMessage>
      )}
    </>
  )
}

export default WeatherStats
