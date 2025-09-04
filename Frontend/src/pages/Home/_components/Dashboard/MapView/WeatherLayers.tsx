import { LayersControl, TileLayer } from 'react-leaflet'

interface WeatherLayersProps {
  apiKey: string
}

const WeatherLayers: React.FC<WeatherLayersProps> = ({ apiKey }) => {
  return (
    <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="Light Map">
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
      </LayersControl.BaseLayer>

      <LayersControl.Overlay name="Temperature">
        <TileLayer
          url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          opacity={0.8}
        />
      </LayersControl.Overlay>
    </LayersControl>
  )
}

export default WeatherLayers
