import type { FC } from 'react'
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
  data: { name: string; value: number }[]
  color?: string
}

const LineChartBox: FC<LineChartBoxProps> = ({ data, color = '#007acc' }) => {
  const { locationOnePin, locationTwoPin } = usePinContext()
  const selectedPin = locationOnePin ?? locationTwoPin

  if (!selectedPin) return <div>Please select a location</div>

  const { position, locationName } = selectedPin
  const { lat, lng } = position

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Display selected pin info */}
      <div>
        <h3>Selected Location</h3>
        <p><strong>Name:</strong> {locationName}</p>
        <p><strong>Latitude:</strong> {lat}</p>
        <p><strong>Longitude:</strong> {lng}</p>
      </div>

      {/* Line chart */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChartBox
