// import type { FC } from 'react'
import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

import { usePinContext } from '@/_components/ContextHooks/usePinContext'


interface LineChartBoxProps {
  metric: "temperature" | "wind_speed" | "humidity" | "precipitation" // you can extend this
  color?: string
}

const LineChartBox = ({ metric, color = "#007acc" }: LineChartBoxProps) => {
  const { locationOnePin, locationTwoPin } = usePinContext()
  const selectedPin = locationOnePin ?? locationTwoPin
  const [weatherData, setWeatherData] = useState<{ name: string; value: number }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedPin) return

    const fetchWeatherData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Get nearest station
        const nearestRes = await fetch(
          `http://127.0.0.1:2333/api/weather/nearest?lat=${selectedPin.position.lat}&lng=${selectedPin.position.lng}`
        )
        if (!nearestRes.ok) throw new Error(`Failed to fetch nearest station: ${nearestRes.status}`)
        const nearestJson = await nearestRes.json()
        if (nearestJson.status !== "success") throw new Error(nearestJson.message)

        const stationName = nearestJson.data.station_name

        //  Get weather data for that station
        const stationRes = await fetch(`http://127.0.0.1:2333/api/weather/${stationName}`)
        if (!stationRes.ok) throw new Error(`Failed to fetch station data: ${stationRes.status}`)
        const stationJson = await stationRes.json()
        const stationData = stationJson[0]

        // Format for Recharts dynamically based on the selected metric
        const formatted = [
          {
            name: metric.replace("_", " ").toUpperCase(),
            value: stationData[metric],
          },
        ]
        setWeatherData(formatted)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [selectedPin, metric])


  if (!selectedPin) return <div>Please select a location</div>
  

  const { position, locationName } = selectedPin
  const { lat, lng } = position

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Selected location info */}
      <div>
        <h3>Selected Location</h3>
        <p><strong>Name:</strong> {locationName}</p>
        <p><strong>Latitude:</strong> {lat}</p>
        <p><strong>Longitude:</strong> {lng}</p>
      </div>

      {/* Loading and error handling */}
      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: 'red' }}>Error:{error}</p>}


      {/* Line chart */}
      {!loading && !error && weatherData.length > 0 && (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weatherData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default LineChartBox
