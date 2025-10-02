import type { FC } from 'react'
import { Marker, useMapEvents } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { usePinContext } from '../../../../../_components/ContextHooks/usePinContext'

const createPurpleIcon = (label: string) => divIcon({
  className: 'custom-pin',
  html: `
    <div style="
      width: 24px;
      height: 24px;
      background-color: #8B5CF6;
      border: 2px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    ">
      <span style="
        color: white;
        font-weight: bold;
        font-size: 12px;
        transform: rotate(45deg);
      ">${label}</span>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
})

const MapPins: FC = () => {
  const { locationOnePin, locationTwoPin, addPin, removePin } = usePinContext()

  useMapEvents({
    contextmenu: (e) => {
      e.originalEvent.preventDefault()
      addPin(e.latlng)
    }
  })

  const handlePinRightClick = (pinId: string, e: any) => {
    e.originalEvent.preventDefault()
    e.originalEvent.stopPropagation()
    removePin(pinId)
  }

  return (
    <>
      {locationOnePin && (
        <Marker
          position={locationOnePin.position}
          icon={createPurpleIcon('1')}
          eventHandlers={{
            contextmenu: (e) => handlePinRightClick(locationOnePin.id, e)
          }}
        />
      )}
      {locationTwoPin && (
        <Marker
          position={locationTwoPin.position}
          icon={createPurpleIcon('2')}
          eventHandlers={{
            contextmenu: (e) => handlePinRightClick(locationTwoPin.id, e)
          }}
        />
      )}
    </>
  )
}

export default MapPins