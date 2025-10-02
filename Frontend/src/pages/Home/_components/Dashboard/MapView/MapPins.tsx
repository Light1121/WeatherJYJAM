import type { FC } from 'react'
import { Marker, useMapEvents } from 'react-leaflet'
import { divIcon } from 'leaflet'
import type { LeafletMouseEvent } from 'leaflet'
import { usePinContext } from '@/_components/ContextHooks/usePinContext'

const createPurpleIcon = (label: string) =>
  divIcon({
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
      "><span>${label}</span></div>
    </div>
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    </style>
  `,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  })

const MapPins: FC = () => {
  const { locationOnePin, locationTwoPin, addPin, removePin } = usePinContext()
  // Removed unused isLoading state

  useMapEvents({
    click: async (e) => {
      await addPin(e.latlng)
    },
  })

  const handlePinClick = (pinId: string, e: LeafletMouseEvent) => {
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
            click: (e) => handlePinClick(locationOnePin.id, e),
          }}
        />
      )}
      {locationTwoPin && (
        <Marker
          position={locationTwoPin.position}
          icon={createPurpleIcon('2')}
          eventHandlers={{
            click: (e) => handlePinClick(locationTwoPin.id, e),
          }}
        />
      )}
    </>
  )
}

export default MapPins
