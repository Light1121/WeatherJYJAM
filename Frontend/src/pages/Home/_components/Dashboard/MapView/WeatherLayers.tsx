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

    Object.entries(layerRefs.current).forEach(([key, layer]) => {
      if (layer && layer.getContainer && layer.getContainer()) {
        const container = layer.getContainer()
        if (container) {
          // Clear existing filter first to prevent conflicts
          container.style.filter = ''
          // Apply new filter
          requestAnimationFrame(() => {
            container.style.filter = style
            container.style.transition = 'filter 0.3s ease'
          })
          
          // Also apply to individual tiles for better coverage
          const tiles = container.querySelectorAll('img')
          tiles.forEach(tile => {
            if (tile instanceof HTMLImageElement) {
              tile.style.filter = ''
              requestAnimationFrame(() => {
                tile.style.filter = style
                tile.style.transition = 'filter 0.3s ease'
              })
            }
          })
        }
      }
    })
  }, [controls, getLayerStyle])

  // Ref handler to store layer references and apply initial styles
  const createRefHandler = (layerKey: string) => (layer: LeafletTileLayer | null) => {
    if (layer) {
      layerRefs.current[layerKey] = layer
      
      // Apply initial styles after layer is mounted
      setTimeout(() => {
        const style = getLayerStyle()
        const container = layer.getContainer()
        if (container) {
          container.style.filter = style
          container.style.transition = 'filter 0.3s ease'
          
          // Apply to existing tiles
          const tiles = container.querySelectorAll('img')
          tiles.forEach(tile => {
            if (tile instanceof HTMLImageElement) {
              tile.style.filter = style
              tile.style.transition = 'filter 0.3s ease'
            }
          })
        }
      }, 100)
      
      // Listen for new tiles being loaded and apply styles
      layer.on('tileload', () => {
        setTimeout(() => {
          const style = getLayerStyle()
          const container = layer.getContainer()
          if (container) {
            // Apply to newly loaded tiles
            const tiles = container.querySelectorAll('img')
            tiles.forEach(tile => {
              if (tile instanceof HTMLImageElement && !tile.style.filter) {
                tile.style.filter = style
                tile.style.transition = 'filter 0.3s ease'
              }
            })
          }
        }, 50)
      })
      
    } else {
      // Clean up when layer is removed
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
          opacity={1} // Let CSS filter handle opacity
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Humidity">
        <TileLayer
          ref={createRefHandler('humidity')}
          url={`https://maps.openweathermap.org/maps/2.0/weather/HRD0/{z}/{x}/{y}?appid=${apiKey}`}
          opacity={1} // Let CSS filter handle opacity
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Wind Speed">
        <TileLayer
          ref={createRefHandler('windSpeed')}
          url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          opacity={1} // Let CSS filter handle opacity
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Wind with Arrows">
        <TileLayer
          ref={createRefHandler('windArrows')}
          url={`https://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?appid=${apiKey}&arrow_step=16&use_norm=true`}
          opacity={1} // Let CSS filter handle opacity
        />
      </LayersControl.Overlay>
    </LayersControl>
  )
}

export default WeatherLayers