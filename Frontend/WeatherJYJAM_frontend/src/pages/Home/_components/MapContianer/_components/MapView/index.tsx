import type { FC } from 'react'
import styled from 'styled-components'
import Map from './_components/Map'

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`

const MapTitle = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const MapView: FC = () => (
  <MapContainer>
    <MapTitle>Map 1</MapTitle>
    <Map />
  </MapContainer>
)

export default MapView
