import type { TimeRangeSliderProps } from '@/pages/Details/_components/types'
import { 
  RangeContainer,
  Track,
  Thumb,
} from './styles'

import React, { useState, useEffect, useRef } from 'react'
import { Range as ReactRange, getTrackBackground } from 'react-range'

const STEP = 1

const TimeRangeSlider: React.FC<TimeRangeSliderProps> = ({
  minYear = 2015,
  maxYear = 2024,
  yearRange,
  onYearRangeChange,
}) => {


  const [internalRange, setInternalRange] = useState(yearRange)
  const [dragging, setDragging] = useState(false)

  const [draggedThumb, setDraggedThumb] = useState<0 | 1 | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dragging) setInternalRange(yearRange)
  }, [yearRange, dragging])

  const handleChange = (values: number[]) => {
    return setInternalRange(values as [number, number])
  }
  const handleMouseDown = () => setDragging(true)
  const handleMouseUp = () => {
    setDragging(false)
    onYearRangeChange(internalRange)
  }

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const clickPos = ((e.clientX - rect.left) / rect.width) * (maxYear - minYear) + minYear

    const distanceToStart = Math.abs(clickPos - yearRange[0])
    const distanceToEnd = Math.abs(clickPos - yearRange[1])

    if (distanceToStart < distanceToEnd) {
      // move start thumb, prevent crossing
      const newStart = Math.min(clickPos, yearRange[1])
      onYearRangeChange([Math.round(newStart), yearRange[1]])
    } else {
      // move end thumb, prevent crossing
      const newEnd = Math.max(clickPos, yearRange[0])
      onYearRangeChange([yearRange[0], Math.round(newEnd)])
    }
  }


// ---------- Render ----------
  return (
    <RangeContainer>
        {/* Slider */}
        <ReactRange
          values={yearRange}
          step={STEP}
          min={minYear}
          max={maxYear}
          onChange={handleChange}
          renderTrack={({ props, children }) => (
            <Track
              {...props}
              background={getTrackBackground({
                values: yearRange,
                colors: ['#ddd', '#007acc', '#ddd'],
                min: minYear,
                max: maxYear,
              })}
              onClick={handleTrackClick} // Add click to move nearest thumb
              ref={props.ref}
            >
              {children}
            </Track>
          )}
          renderThumb={({ props, index, isDragged }) => (
            <Thumb 
            {...props} 
            isDragged={isDragged || draggedThumb === index}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            key={index}
            />
          )}
        />
    </RangeContainer>
  )
}

export default TimeRangeSlider
