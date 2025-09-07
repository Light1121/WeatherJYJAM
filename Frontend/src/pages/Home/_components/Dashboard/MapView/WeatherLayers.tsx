import { LayersControl, TileLayer } from 'react-leaflet'

interface WeatherLayersProps {
  apiKey: string
}

const WeatherLayers: React.FC<WeatherLayersProps> = ({ apiKey }) => {
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
          url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          opacity={0.7}
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Humidity">
        <TileLayer
          url={`https://maps.openweathermap.org/maps/2.0/weather/HRD0/{z}/{x}/{y}?appid=${apiKey}`}
          opacity={0.7}
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Wind Speed">
        <TileLayer
          url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          opacity={0.7}
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Wind with Arrows">
        <TileLayer
          url={`https://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?appid=${apiKey}&arrow_step=16&use_norm=true`}
          opacity={0.7}
        />
      </LayersControl.Overlay>
    </LayersControl>
  )
}

export default WeatherLayers
