import type { FC } from 'react'
import styled from 'styled-components'
import australiaMap from '../_asset/Australia_map.svg.png'

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MapImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center;
`

const Map: FC = () => (
  <MapContainer>
    <MapImage src={australiaMap} alt="Australia Weather Map" />
  </MapContainer>
)

export default Map
