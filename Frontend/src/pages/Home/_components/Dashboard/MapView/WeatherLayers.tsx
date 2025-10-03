import { LayersControl, TileLayer } from 'react-leaflet'
import { useControlPanelContext } from '@/_components/ContextHooks/useControlPanelContext'
import { useEffect, useRef } from 'react'
import { TileLayer as LeafletTileLayer } from 'leaflet'

interface WeatherLayersProps {
  apiKey: string
}

const WeatherLayers: React.FC<WeatherLayersProps> = ({ apiKey }) => {
  const { controls, getLayerStyle } = useControlPanelContext()
  const layerRefs = useRef<{ [key: string]: LeafletTileLayer }>({})

  // Apply styles to all layers when controls change
  useEffect(() => {
    const style = getLayerStyle()
    
    Object.values(layerRefs.current).forEach(layer => {
      if (layer && layer.getContainer && layer.getContainer()) {
        const container = layer.getContainer()
        if (container) {
          container.style.filter = style
          container.style.transition = 'filter 0.3s ease'
        }
      }
    })
  }, [controls, getLayerStyle])

  // Simple ref handler - no event listeners that could interfere
  const createRefHandler = (layerKey: string) => (layer: LeafletTileLayer | null) => {
    if (layer) {
      layerRefs.current[layerKey] = layer
      // Apply styles immediately
      const style = getLayerStyle()
      setTimeout(() => {
        const container = layer.getContainer()
        if (container) {
          container.style.filter = style
          container.style.transition = 'filter 0.3s ease'
        }
      }, 100)
    } else {
      delete layerRefs.current[layerKey]
    }
  }

  return (
    <LayersControl position="topleft">
      <LayersControl.BaseLayer checked name="Light Map">
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
      </LayersControl.BaseLayer>

      <LayersControl.Overlay name="Temperature">
        <TileLayer
          ref={createRefHandler('temperature')}
          url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          opacity={controls.opacity / 100}
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Humidity">
        <TileLayer
          ref={createRefHandler('humidity')}
          url={`https://maps.openweathermap.org/maps/2.0/weather/HRD0/{z}/{x}/{y}?appid=${apiKey}`}
          opacity={controls.opacity / 100}
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Wind Speed">
        <TileLayer
          ref={createRefHandler('windSpeed')}
          url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          opacity={controls.opacity / 100}
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Wind with Arrows">
        <TileLayer
          ref={createRefHandler('windArrows')}
          url={`https://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?appid=${apiKey}&arrow_step=16&use_norm=true`}
          opacity={controls.opacity / 100}
        />
      </LayersControl.Overlay>
    </LayersControl>
  )
}

export default WeatherLayers