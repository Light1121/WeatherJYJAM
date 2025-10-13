import type { FC } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Label,
  Legend,
} from 'recharts'

import { usePinContext } from '@/_components/ContextHooks/usePinContext'

interface WeatherData {
  date: string
  temperature: number
  humidity: number
  wind_speed: number
  precipitation: number
}

interface LineChartBoxProps {
  metric: keyof Pick<
    WeatherData,
    'temperature' | 'humidity' | 'wind_speed' | 'precipitation'
  >
  data: WeatherData[]
  color?: string
}

const metricLabels: Record<string, string> = {
  temperature: 'Temperature (°C)',
  humidity: 'Humidity (%)',
  wind_speed: 'Wind Speed (m/s)',
  precipitation: 'Precipitation (mm)',
}

const LineChartBox: FC<LineChartBoxProps> = ({
  metric,
  data,
  color = '#007acc',
}) => {
  const { locationOnePin, locationTwoPin } = usePinContext()
  const selectedPin = locationOnePin ?? locationTwoPin

  if (!selectedPin) return <div
    style={{
      width: '100%',
      height: '100%', // same as your chart height or GraphBox height
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#666',
      fontSize: '16px',
      fontWeight: 500,
    }}
  >
    Please select a location
  </div>

  
  const years = data.map((row) => row.date.split('-')[0]); // "YYY
  const uniqueYears = Array.from(new Set(years));
  const multipleYears = uniqueYears.length > 1;

  const formattedData: { date: string; value: number }[] = data.map((row) => {
    const [year, month, day] = row.date.split('-') // YYYY-MM-DD
    const monthName = new Date(`${year}-${month}-01`).toLocaleString('en-US', {
    month: 'short', // "Jan", "Feb"
    year: multipleYears ? 'numeric' : undefined, // only show year if multiple years
  });


  day
  return {
    date: monthName,
    value: row[metric],
  }
  })

  return (

    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          {/* Grid */}
          <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />

          {/* X Axis */}
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#555' }} interval={Math.floor(formattedData.length / 6)}>
            <Label value="Month" offset={-10} position="insideBottom" style={{ fontWeight: 'bold', fill: '#333' }} />
          </XAxis>

          {/* Y Axis */}
          <YAxis tick={{ fontSize: 12, fill: '#555' }}>
            <Label
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: 'middle', fontWeight: 'bold', fill: '#333' }}
              value={metricLabels[metric]}
            />
          </YAxis>

          {/* Tooltip */}
          <Tooltip
            contentStyle={{ backgroundColor: '#f0f8ff', borderRadius: '8px', border: '1px solid #007acc' }}
            labelStyle={{ fontWeight: 'bold' }}
          />

          {/* Legend */}
          <Legend verticalAlign="top" height={36} />

          {/* Line with gradient */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="75%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3, fill: color }}
            activeDot={{ r: 6 }}
            fill="url(#lineGradient)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChartBox