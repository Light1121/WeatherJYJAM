import type { FC } from 'react'
import { useState } from 'react'
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
  type LegendPayload,
} from 'recharts'

interface MultiPinWeatherData {
  date: string
  temperature?: number
  humidity?: number
  wind_speed?: number
  precipitation?: number
  pinId: string
  locationName: string
}

interface LineChartBoxProps {
  metric: keyof Pick<
    MultiPinWeatherData,
    'temperature' | 'humidity' | 'wind_speed' | 'precipitation'
  >
  data: MultiPinWeatherData[]
  color?: string
}

type FormattedDataRow = {
  date: string
  [key: string]: string | number | undefined
}

const metricLabels: Record<string, string> = {
  temperature: 'Temperature (°C)',
  humidity: 'Humidity (%)',
  wind_speed: 'Wind Speed (m/s)',
  precipitation: 'Precipitation (mm)',
}

const colors = ['#007acc', '#e67e22']

const LineChartBox: FC<LineChartBoxProps> = ({ metric, data }) => {
  const [highlighted, setHighlighted] = useState<string | null>(null)

  // Get unique pin names
  const pins: string[] = Array.from(new Set(data.map((d) => d.locationName)))
  const locations = Array.from(new Set(data.map((d) => d.locationName)))
    .filter(Boolean)
    .slice(0, 2)

  // Group data by pin
  const groupedData: Record<string, MultiPinWeatherData[]> = {}
  for (const d of data) {
    if (!groupedData[d.locationName]) groupedData[d.locationName] = []
    groupedData[d.locationName].push(d)
  }

  // Collect all dates across pins
  const allDates: string[] = Array.from(new Set(data.map((d) => d.date))).sort()

  // Merge into a single dataset for Recharts
  const mergedData = allDates.map((date: string) => {
    const entry: Record<string, string | number | undefined> = { date }
    for (const pin of pins) {
      const found = groupedData[pin]?.find(
        (d: MultiPinWeatherData) => d.date === date,
      )
      if (found) entry[pin] = found[metric]
    }
    return entry
  })

  // Handle no data / no pins case
  const hasData = data.length > 0 && locations.length > 0

  if (!hasData) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
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
    )
  }

  // Handle legend click
  const handleLegendClick = (o: LegendPayload) => {
    const key = o.dataKey as string
    setHighlighted((prev) => (prev === key ? null : key))
  }

  // Format x-axis labels
  const years = data.map((row) => row.date.split('-')[0])
  const uniqueYears = Array.from(new Set(years))
  const multipleYears = uniqueYears.length > 1

  const formattedData: FormattedDataRow[] = mergedData.map((row) => {
    const [year, month] = String(row.date).split('-')
    const monthName = new Date(`${year}-${month}-01`).toLocaleString('en-US', {
      month: 'short',
      year: multipleYears ? 'numeric' : undefined,
    })

    return {
      ...row,
      date: monthName, // this replaces "2025-01-01" with "Jan"
    }
  })

  // If two locations exist, compute difference (A - B)
  if (locations.length === 2) {
    const [locA, locB] = locations
    formattedData.forEach((d) => {
      const a = Number(d[locA]) || Number(d[locB]) || 0
      const b = Number(d[locB]) || Number(d[locA]) || 0
      d.difference = Math.abs(a - b)
    })
  }

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          {/* Grid */}
          <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />

          {/* X Axis */}
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#555' }}
            interval={Math.floor(formattedData.length / 6)}
          >
            <Label
              value="Month"
              offset={-10}
              position="insideBottom"
              style={{ fontWeight: 'bold', fill: '#333' }}
            />
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
            contentStyle={{
              backgroundColor: '#f0f8ff',
              borderRadius: '8px',
              border: '1px solid #007acc',
            }}
            labelStyle={{ fontWeight: 'bold' }}
          />

          {/* Legend */}
          <Legend verticalAlign="top" height={36} onClick={handleLegendClick} />

          {/* Each line now uses a field in formattedData */}
          {locations.map((loc, idx) => (
            <Line
              key={loc}
              type="monotone"
              dataKey={loc} //  this references the mergedData column
              name={loc}
              stroke={colors[idx]}
              strokeWidth={highlighted === loc ? 3 : 2}
              strokeOpacity={highlighted && highlighted !== loc ? 0.3 : 1}
              dot={false}
              onClick={() =>
                setHighlighted((prev) => (prev === loc ? null : loc))
              }
              style={{ cursor: 'pointer' }}
            />
          ))}

          {/* Dotted difference line */}
          {locations.length === 2 && (
            <Line
              type="monotone"
              dataKey="difference"
              stroke="#555"
              strokeWidth={highlighted === 'difference' ? 3 : 2}
              strokeDasharray="5 5"
              dot={false}
              opacity={highlighted && highlighted !== 'difference' ? 0.3 : 0.6}
              name={`Difference`}
              onClick={() =>
                setHighlighted((prev) =>
                  prev === 'difference' ? null : 'difference',
                )
              }
              style={{ cursor: 'pointer' }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChartBox
