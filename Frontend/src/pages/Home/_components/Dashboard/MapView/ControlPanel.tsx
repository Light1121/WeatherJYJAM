import React from 'react'
import styled from 'styled-components'

const ControlPanelContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 2000;
  background: transparent;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`

const ZoomLabel = styled.div`
  font-family: 'Instrument Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  text-shadow:
    -1px -1px 0 #000000,
    1px -1px 0 #000000,
    -1px 1px 0 #000000,
    1px 1px 0 #000000,
    0 0 3px rgba(0, 0, 0, 0.8);
`

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ZoomIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  text-shadow:
    -1px -1px 0 #000000,
    1px -1px 0 #000000,
    -1px 1px 0 #000000,
    1px 1px 0 #000000,
    0 0 3px rgba(0, 0, 0, 0.8);
`

const ZoomSlider = styled.input`
  width: 120px;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.3);
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #4a90e2;
    cursor: grab;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;

    &:hover {
      background: #357abd;
      transform: scale(1.1);
    }

    &:active {
      cursor: grabbing;
    }
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #4a90e2;
    cursor: grab;
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
`

const ControlPanel: React.FC = () => {
  return (
    <ControlPanelContainer>
      {/* Zoom Control */}
      <ZoomLabel>Zoom</ZoomLabel>
      <SliderContainer>
        <ZoomIcon>−</ZoomIcon>
        <ZoomSlider
          type="range"
          min="2.5"
          max="18"
          step="0.5"
          defaultValue="4"
        />
        <ZoomIcon>+</ZoomIcon>
      </SliderContainer>

      {/* Opacity Control */}
      <ZoomLabel>Opacity</ZoomLabel>
      <SliderContainer>
        <ZoomIcon>◯</ZoomIcon>
        <ZoomSlider type="range" min="0" max="100" step="5" defaultValue="80" />
        <ZoomIcon>●</ZoomIcon>
      </SliderContainer>

      {/* Contrast Control */}
      <ZoomLabel>Contrast</ZoomLabel>
      <SliderContainer>
        <ZoomIcon>◐</ZoomIcon>
        <ZoomSlider
          type="range"
          min="50"
          max="200"
          step="10"
          defaultValue="100"
        />
        <ZoomIcon>◑</ZoomIcon>
      </SliderContainer>

      {/* Saturation Control */}
      <ZoomLabel>Saturation</ZoomLabel>
      <SliderContainer>
        <ZoomIcon>☾</ZoomIcon>
        <ZoomSlider
          type="range"
          min="0"
          max="200"
          step="10"
          defaultValue="100"
        />
        <ZoomIcon>☽</ZoomIcon>
      </SliderContainer>

      {/* Brightness Control */}
      <ZoomLabel>Brightness</ZoomLabel>
      <SliderContainer>
        <ZoomIcon>☀</ZoomIcon>
        <ZoomSlider
          type="range"
          min="50"
          max="150"
          step="5"
          defaultValue="100"
        />
        <ZoomIcon>☀</ZoomIcon>
      </SliderContainer>

      {/* Hue Rotation Control */}
      <ZoomLabel>Hue</ZoomLabel>
      <SliderContainer>
        <ZoomIcon>🎨</ZoomIcon>
        <ZoomSlider type="range" min="0" max="360" step="15" defaultValue="0" />
        <ZoomIcon>🎨</ZoomIcon>
      </SliderContainer>

      {/* Color Scheme Selector */}
      <ZoomLabel>Color Mode</ZoomLabel>
      <SliderContainer>
        <select
          style={{
            width: '140px',
            height: '24px',
            borderRadius: '4px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#333',
            fontSize: '11px',
            padding: '2px 4px',
            cursor: 'pointer',
          }}
          defaultValue="default"
        >
          <option value="default">Default</option>
          <option value="colorblind">Color Blind</option>
          <option value="high-contrast">High Contrast</option>
          <option value="grayscale">Grayscale</option>
          <option value="inverted">Inverted</option>
        </select>
      </SliderContainer>
    </ControlPanelContainer>
  )
}

export default ControlPanel
