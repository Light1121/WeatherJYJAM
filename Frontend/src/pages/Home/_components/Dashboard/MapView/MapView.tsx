import type { FC } from 'react'
import styled from 'styled-components'
import Map from './Map'
import ControlPanel from './ControlPanel'




const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`

const MapTitle = styled.div`
  position: absolute;
  font-family: 'Instrument Sans', sans-serif;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: bold;
  color: #333;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`



const MapView: FC = () => {
  

  return (
    
      <MapContainer>
        <Map />

        <MapTitle>empty</MapTitle>

        <ControlPanel />
      </MapContainer>
    
  )
}

export default MapView
