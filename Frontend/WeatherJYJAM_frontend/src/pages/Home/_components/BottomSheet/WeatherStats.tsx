import type { FC } from 'react'
import { styled } from 'styled-components'
import { Dropdown } from '@/_components'
import {
  TemperatureBar,
  WindBar,
  HumidityBar,
} from '@/_components/WeatherDataBar'

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

const GraphBox = styled.div`
  display: grid;
  place-items: center;
  padding: 8px;
  border: 1px dashed #ddd;
  border-radius: 10px;
  min-height: 220px;
  color: #666;
  font-size: 14px;
  font-family: 'Instrument Sans', sans-serif;
`

interface WeatherStatsProps {
  isExpanded?: boolean
}

const WeatherStats: FC<WeatherStatsProps> = ({ isExpanded = true }) => {
  return (
    <>
      <HeaderRow>
        <Location>Monash University Clayton Campus</Location>
        <NowTemp>20°C</NowTemp>
      </HeaderRow>

      {isExpanded && (
        <>
          <BarsRow>
            <TemperatureBar valuePosition={65} />
            <WindBar valuePosition={45} />
            <HumidityBar valuePosition={30} />
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
                  <MenuItem>Year options here</MenuItem>
                </Menu>
              </Dropdown>

              <Dropdown
                variant="ink"
                trigger={(toggle) => (
                  <FilterButton onClick={toggle}>Month</FilterButton>
                )}
              >
                <Menu>
                  <MenuItem>Month options here</MenuItem>
                </Menu>
              </Dropdown>
            </Filters>

            <BarsRow>
              <TemperatureBar valuePosition={65} />
              <WindBar valuePosition={45} />
              <HumidityBar valuePosition={30} />
            </BarsRow>

            <GraphBox>Graph goes here later</GraphBox>
          </PastGrid>
        </>
      )}
    </>
  )
}

export default WeatherStats
