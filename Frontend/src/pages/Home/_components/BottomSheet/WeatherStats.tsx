import type { FC } from 'react'
import { styled } from 'styled-components'
import { Dropdown } from '@/_components'
import { TemperatureBar, WindBar, HumidityBar } from '@/_components'
import { useNavigate } from 'react-router-dom'
import { usePinContext } from '@/_components/ContextHooks/usePinContext'
import { useControlPanelContext } from '@/_components/ContextHooks/useControlPanelContext'
import type { WeatherData } from '@/_components/ContextHooks/contexts'

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

const PastGrid = styled.div`
  display: grid;
  font-family: 'Instrument Sans', sans-serif;
  grid-template-columns: 1.3fr 1fr;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const SectionTitle = styled.h4`
  margin: 4px 0;
  font-size: 16px;
  font-family: 'Instrument Sans', sans-serif;
`

const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 6px 0 2px;
`

const FilterButton = styled.button`
  height: 36px;
  font-family: 'Instrument Sans', sans-serif;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #f6f7f9;
  color: #23272a;
  cursor: pointer;
  font-size: 14px;
`

const Menu = styled.ul`
  list-style: none;
  font-family: 'Instrument Sans', sans-serif;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
`

const MenuItem = styled.li`
  font-size: 14px;
  font-family: 'Instrument Sans', sans-serif;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: default;

  &:hover {
    background: #f3f3f7;
  }
`

const GraphButton = styled.button<{ tall?: boolean }>`
  display: grid;
  place-items: center;
  padding: 8px;
  border: 1px solid #007acc;
  border-radius: 10px;
  min-height: ${(props) => (props.tall ? '120px' : '220px')};
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
const PastTwoColumn = styled.div`
  display: flex;
  gap: 32px;
  @media (max-width: 900px) {
    flex-direction: column;
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
  const renderWeatherBars = (weatherData: WeatherData) => (
    <>
      <TemperatureBar
        valuePosition={Math.max(0, Math.min(100, weatherData.temperature + 45))}
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

              <PastGrid>
                <SectionTitle>Past Weather Report</SectionTitle>

                <Filters>
                  <Dropdown
                    variant="light"
                    trigger={(toggle) => (
                      <FilterButton onClick={toggle}>Year</FilterButton>
                    )}
                  >
                    <Menu>
                      <MenuItem>2024</MenuItem>
                      <MenuItem>2023</MenuItem>
                      <MenuItem>2022</MenuItem>
                    </Menu>
                  </Dropdown>

                  <Dropdown
                    variant="ink"
                    trigger={(toggle) => (
                      <FilterButton onClick={toggle}>Month</FilterButton>
                    )}
                  >
                    <Menu>
                      <MenuItem>January</MenuItem>
                      <MenuItem>February</MenuItem>
                      <MenuItem>March</MenuItem>
                      <MenuItem>April</MenuItem>
                      <MenuItem>May</MenuItem>
                      <MenuItem>June</MenuItem>
                      <MenuItem>July</MenuItem>
                      <MenuItem>August</MenuItem>
                      <MenuItem>September</MenuItem>
                      <MenuItem>October</MenuItem>
                      <MenuItem>November</MenuItem>
                      <MenuItem>December</MenuItem>
                    </Menu>
                  </Dropdown>
                </Filters>

                <BarsRow>
                  {hasLocationOne &&
                    locationOnePin?.weatherData &&
                    renderWeatherBars(locationOnePin.weatherData)}
                  {hasLocationTwo &&
                    locationTwoPin?.weatherData &&
                    renderWeatherBars(locationTwoPin.weatherData)}
                </BarsRow>

                <GraphButton onClick={handleViewDetails}>
                  Click to view detailed graphs
                </GraphButton>
              </PastGrid>
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
              <SectionTitle
                style={{ textAlign: 'center', margin: '20px 0 16px 0' }}
              >
                Past Weather Report
              </SectionTitle>
              <PastTwoColumn>
                {/* Location 1 Past */}
                <div style={{ flex: 1 }}>
                  <Filters>
                    <Dropdown
                      variant="light"
                      trigger={(toggle) => (
                        <FilterButton onClick={toggle}>Year</FilterButton>
                      )}
                    >
                      <Menu>
                        <MenuItem>2024</MenuItem>
                        <MenuItem>2023</MenuItem>
                        <MenuItem>2022</MenuItem>
                      </Menu>
                    </Dropdown>
                    <Dropdown
                      variant="ink"
                      trigger={(toggle) => (
                        <FilterButton onClick={toggle}>Month</FilterButton>
                      )}
                    >
                      <Menu>
                        <MenuItem>January</MenuItem>
                        <MenuItem>February</MenuItem>
                        <MenuItem>March</MenuItem>
                      </Menu>
                    </Dropdown>
                  </Filters>
                  {locationOnePin.weatherData && (
                    <BarsRow>
                      {renderWeatherBars(locationOnePin.weatherData)}
                    </BarsRow>
                  )}
                </div>

                {/* Location 2 Past */}
                <div style={{ flex: 1 }}>
                  <Filters>
                    <Dropdown
                      variant="light"
                      trigger={(toggle) => (
                        <FilterButton onClick={toggle}>Year</FilterButton>
                      )}
                    >
                      <Menu>
                        <MenuItem>2024</MenuItem>
                        <MenuItem>2023</MenuItem>
                        <MenuItem>2022</MenuItem>
                      </Menu>
                    </Dropdown>
                    <Dropdown
                      variant="ink"
                      trigger={(toggle) => (
                        <FilterButton onClick={toggle}>Month</FilterButton>
                      )}
                    >
                      <Menu>
                        <MenuItem>January</MenuItem>
                        <MenuItem>February</MenuItem>
                        <MenuItem>March</MenuItem>
                      </Menu>
                    </Dropdown>
                  </Filters>
                  {locationTwoPin.weatherData && (
                    <BarsRow>
                      {renderWeatherBars(locationTwoPin.weatherData)}
                    </BarsRow>
                  )}
                </div>
              </PastTwoColumn>
              <GraphButton
                tall
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
