import type { FC } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const ControlPanelWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 260px;
`

const HandleButton = styled.button`
  cursor: pointer;
  width: 48px;
  height: 24px;
  border-radius: 20%;
  border: 1px solid #ddd;
  background: white;
  margin-bottom: -2px;
  margin-left: 12px;
  z-index: 500;
  font-size: 16px;
  line-height: 1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`

const StyledControlPanel = styled.div<{ isOpen: boolean }>`
  background: white;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: ${({ isOpen }) => (isOpen ? '16px 20px' : '8px 20px')};
  width: 100%;
  max-height: ${({ isOpen }) => (isOpen ? '400px' : '50px')};
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    padding 0.3s ease;
  position: relative;
`

const Content = styled.div<{ isOpen: boolean }>`
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Title = styled.h3`
  margin: 8px 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  font-family: 'Instrument Sans', sans-serif;
`

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Label = styled.div`
  font-family: 'Instrument Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #555;
`

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Icon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 12px;
  font-weight: bold;
`

const Slider = styled.input`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: #e0e0e0;
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #007acc;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;

    &:hover {
      background: #005f99;
      transform: scale(1.1);
    }
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #007acc;
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`

const Select = styled.select`
  width: 100%;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: #f6f7f9;
  color: #333;
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
  font-family: 'Instrument Sans', sans-serif;

  &:focus {
    outline: none;
    border-color: #007acc;
  }
`

const ControlPanel: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <ControlPanelWrapper>
      <HandleButton onClick={toggle} aria-label="Toggle control panel">
        {isOpen ? '▾' : '▴'}
      </HandleButton>

      <StyledControlPanel isOpen={isOpen}>
        {!isOpen && <Title>Map Controls</Title>}
        
        <Content isOpen={isOpen}>
          <Title>Map Controls</Title>
          
          {/* Zoom Control */}
          <ControlGroup>
            <Label>Zoom</Label>
            <SliderContainer>
              <Icon>−</Icon>
              <Slider
                type="range"
                min="2.5"
                max="18"
                step="0.5"
                defaultValue="4"
              />
              <Icon>+</Icon>
            </SliderContainer>
          </ControlGroup>

          {/* Opacity Control */}
          <ControlGroup>
            <Label>Opacity</Label>
            <SliderContainer>
              <Icon>◯</Icon>
              <Slider type="range" min="0" max="100" step="5" defaultValue="80" />
              <Icon>●</Icon>
            </SliderContainer>
          </ControlGroup>

          {/* Contrast Control */}
          <ControlGroup>
            <Label>Contrast</Label>
            <SliderContainer>
              <Icon>◐</Icon>
              <Slider
                type="range"
                min="50"
                max="200"
                step="10"
                defaultValue="100"
              />
              <Icon>◑</Icon>
            </SliderContainer>
          </ControlGroup>

          {/* Saturation Control */}
          <ControlGroup>
            <Label>Saturation</Label>
            <SliderContainer>
              <Icon>☾</Icon>
              <Slider
                type="range"
                min="0"
                max="200"
                step="10"
                defaultValue="100"
              />
              <Icon>☽</Icon>
            </SliderContainer>
          </ControlGroup>

          {/* Brightness Control */}
          <ControlGroup>
            <Label>Brightness</Label>
            <SliderContainer>
              <Icon>☀</Icon>
              <Slider
                type="range"
                min="50"
                max="150"
                step="5"
                defaultValue="100"
              />
              <Icon>☀</Icon>
            </SliderContainer>
          </ControlGroup>

          {/* Hue Rotation Control */}
          <ControlGroup>
            <Label>Hue</Label>
            <SliderContainer>
              <Icon>🎨</Icon>
              <Slider type="range" min="0" max="360" step="15" defaultValue="0" />
              <Icon>🎨</Icon>
            </SliderContainer>
          </ControlGroup>

          {/* Color Scheme Selector */}
          <ControlGroup>
            <Label>Color Mode</Label>
            <Select defaultValue="default">
              <option value="default">Default</option>
              <option value="colorblind">Color Blind</option>
              <option value="high-contrast">High Contrast</option>
              <option value="grayscale">Grayscale</option>
              <option value="inverted">Inverted</option>
            </Select>
          </ControlGroup>
        </Content>
      </StyledControlPanel>
    </ControlPanelWrapper>
  )
}

export default ControlPanel