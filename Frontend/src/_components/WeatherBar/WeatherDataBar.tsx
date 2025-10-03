import type { FC } from 'react'
import styled from 'styled-components'
import { type BarVariant, BAR_GRADIENTS } from './weather-bar.share'

type BaseProps = {
  label?: string
  leftText: string
  rightText: string
  variant?: BarVariant
  customGradient?: string
  valuePosition?: number
  customStyle?: React.CSSProperties
}

const Wrap = styled.div`
  display: grid;
  gap: 6px;
  padding: 8px 10px;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #fff;
`

const Head = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  min-height: 18px;
`

const Track = styled.div<{ $gradient: string; $customStyle?: React.CSSProperties }>`
  position: relative;
  height: 12px;
  border-radius: 999px;
  background: ${({ $gradient }) => $gradient};
  overflow: hidden;
  ${({ $customStyle }) => $customStyle && `
    filter: ${$customStyle.filter};
    transition: ${$customStyle.transition};
  `}
`

const Thumb = styled.div<{ $leftPct: number }>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: ${({ $leftPct }) => `${$leftPct}%`};
  width: 6px;
  height: 18px;
  border-radius: 2px;
  background: #333;
  opacity: 0.9;
`

const Ends = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
`

const WeatherDataBar: FC<BaseProps> = ({
  label,
  leftText,
  rightText,
  variant = 'temperature',
  customGradient,
  valuePosition = 50,
  customStyle,
}) => {
  const fallback = 'linear-gradient(90deg, #e5e7eb 0%, #cbd5e1 100%)'
  const gradient =
    customGradient ?? (variant === 'custom' ? fallback : BAR_GRADIENTS[variant])
  const pct = Math.min(100, Math.max(0, valuePosition))

  return (
    <Wrap>
      <Head>{label}</Head>
      <Track $gradient={gradient} $customStyle={customStyle}>
        <Thumb $leftPct={pct} />
      </Track>
      <Ends>
        <span>{leftText}</span>
        <span>{rightText}</span>
      </Ends>
    </Wrap>
  )
}

export default WeatherDataBar

type SimpleProps = { 
  valuePosition?: number
  customStyle?: React.CSSProperties
}

export const TemperatureBar: FC<SimpleProps> = ({ valuePosition, customStyle }) => (
  <WeatherDataBar
    variant="temperature"
    label="Temperature Report"
    leftText="-20°C"
    rightText="40°C"
    valuePosition={valuePosition}
    customStyle={customStyle}
  />
)

export const WindBar: FC<SimpleProps> = ({ valuePosition, customStyle }) => (
  <WeatherDataBar
    variant="wind"
    label="Wind Speed Report"
    leftText="0 kt"
    rightText="60 kt"
    valuePosition={valuePosition}
    customStyle={customStyle}
  />
)

export const HumidityBar: FC<SimpleProps> = ({ valuePosition, customStyle }) => (
  <WeatherDataBar
    variant="humidity"
    label="Humidity Report"
    leftText="30%"
    rightText="100%"
    valuePosition={valuePosition}
    customStyle={customStyle}
  />
)