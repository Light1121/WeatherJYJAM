import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import styled from 'styled-components'
import { createRoot } from 'react-dom/client'
import { useControlPanelContext } from '@/_components/ContextHooks/useControlPanelContext'

const LegendContainer = styled.div<{ isCollapsed: boolean }>`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-family: 'Instrument Sans', sans-serif;
  transition: all 0.3s ease;
  overflow: hidden;
  ${({ isCollapsed }) =>
    isCollapsed
      ? `
    width: auto;
    height: auto;
  `
      : `
    padding: 12px;
    min-width: 200px;
    max-width: 250px;
  `}
`

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #333;
  white-space: nowrap;

  &:hover {
    color: #007acc;
  }
`

const LegendContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const LegendHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`

const LegendTitle = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`

const CollapseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  color: #666;
  line-height: 1;

  &:hover {
    color: #007acc;
  }
`

const LegendSection = styled.div`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #555;
  margin-bottom: 6px;
`

const ColorScale = styled.div<{ filterStyle?: string }>`
  display: flex;
  height: 20px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
  filter: ${({ filterStyle }) => filterStyle || 'none'};
  transition: filter 0.3s ease;
`

const ColorBlock = styled.div<{ color: string }>`
  flex: 1;
  background-color: ${(props) => props.color};
`

const ScaleLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #666;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #555;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`

const WindArrow = styled.div<{ filterStyle?: string }>`
  width: 20px;
  height: 2px;
  background-color: #666;
  position: relative;
  filter: ${({ filterStyle }) => filterStyle || 'none'};
  transition: filter 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    right: -2px;
    top: -3px;
    width: 0;
    height: 0;
    border-left: 6px solid #666;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
  }
`

const NoLayersMessage = styled.div`
  font-size: 12px;
  color: #999;
  text-align: center;
  padding: 8px 0;
`

interface LegendContentComponentProps {
  activeLayers: string[]
  isCollapsed: boolean
  onToggle: () => void
  filterStyle: string
}

const LegendContentComponent = ({
  activeLayers,
  isCollapsed,
  onToggle,
  filterStyle,
}: LegendContentComponentProps) => {
  if (isCollapsed) {
    return (
      <LegendContainer isCollapsed={true}>
        <ToggleButton onClick={onToggle} title="Expand Legend">
          <span>📊</span>
          <span>Legend</span>
        </ToggleButton>
      </LegendContainer>
    )
  }

  return (
    <LegendContainer isCollapsed={false}>
      <LegendHeader>
        <LegendTitle>Map Legend</LegendTitle>
        <CollapseButton onClick={onToggle} title="Collapse Legend">
          ✕
        </CollapseButton>
      </LegendHeader>

      <LegendContent>
        {activeLayers.length === 0 ? (
          <NoLayersMessage>No weather layers active</NoLayersMessage>
        ) : (
          <>
            {/* Temperature Legend */}
            {activeLayers.includes('Temperature') && (
              <LegendSection>
                <SectionTitle>Temperature</SectionTitle>
                <ColorScale filterStyle={filterStyle}>
                  <ColorBlock color="#313695" />
                  <ColorBlock color="#4575b4" />
                  <ColorBlock color="#74add1" />
                  <ColorBlock color="#abd9e9" />
                  <ColorBlock color="#e0f3f8" />
                  <ColorBlock color="#ffffbf" />
                  <ColorBlock color="#fee090" />
                  <ColorBlock color="#fdae61" />
                  <ColorBlock color="#f46d43" />
                  <ColorBlock color="#d73027" />
                  <ColorBlock color="#a50026" />
                </ColorScale>
                <ScaleLabels>
                  <span>-40°C</span>
                  <span>0°C</span>
                  <span>40°C</span>
                </ScaleLabels>
              </LegendSection>
            )}

            {/* Wind Speed Legend */}
            {activeLayers.includes('Wind Speed') && (
              <LegendSection>
                <SectionTitle>Wind Speed</SectionTitle>
                <ColorScale filterStyle={filterStyle}>
                  <ColorBlock color="#d4e6f1" />
                  <ColorBlock color="#85c1e9" />
                  <ColorBlock color="#3498db" />
                  <ColorBlock color="#2874a6" />
                  <ColorBlock color="#1b4f72" />
                </ColorScale>
                <ScaleLabels>
                  <span>0 m/s</span>
                  <span>50+ m/s</span>
                </ScaleLabels>
              </LegendSection>
            )}

            {/* Wind with Arrows Legend */}
            {activeLayers.includes('Wind with Arrows') && (
              <LegendSection>
                <SectionTitle>Wind Direction</SectionTitle>
                <LegendItem>
                  <WindArrow filterStyle={filterStyle} />
                  <span>Wind Direction & Speed</span>
                </LegendItem>
              </LegendSection>
            )}

            {/* Humidity Legend */}
            {activeLayers.includes('Humidity') && (
              <LegendSection>
                <SectionTitle>Humidity</SectionTitle>
                <ColorScale filterStyle={filterStyle}>
                  <ColorBlock color="#fff5e1" />
                  <ColorBlock color="#b3e5fc" />
                  <ColorBlock color="#4fc3f7" />
                  <ColorBlock color="#0288d1" />
                  <ColorBlock color="#01579b" />
                </ColorScale>
                <ScaleLabels>
                  <span>0%</span>
                  <span>100%</span>
                </ScaleLabels>
              </LegendSection>
            )}
          </>
        )}
      </LegendContent>
    </LegendContainer>
  )
}

const MapLegend = () => {
  const map = useMap()
  const { getLayerStyle } = useControlPanelContext()
  const [activeLayers, setActiveLayers] = useState<string[]>([])
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [filterStyle, setFilterStyle] = useState('')

  // Update filter style when controls change
  useEffect(() => {
    setFilterStyle(getLayerStyle())
  }, [getLayerStyle])

  useEffect(() => {
    const legend = new L.Control({ position: 'topright' })
    let root: ReturnType<typeof createRoot> | null = null

    const handleToggle = () => {
      setIsCollapsed((prev) => !prev)
    }

    const handleOverlayAdd = (e: L.LayersControlEvent) => {
      setActiveLayers((prev) => {
        if (!prev.includes(e.name)) {
          return [...prev, e.name]
        }
        return prev
      })
    }

    const handleOverlayRemove = (e: L.LayersControlEvent) => {
      setActiveLayers((prev) => prev.filter((layer) => layer !== e.name))
    }

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'map-legend')
      root = createRoot(div)
      root.render(
        <LegendContentComponent
          activeLayers={activeLayers}
          isCollapsed={isCollapsed}
          onToggle={handleToggle}
          filterStyle={filterStyle}
        />,
      )
      return div
    }

    legend.addTo(map)

    // Listen for layer changes
    map.on('overlayadd', handleOverlayAdd)
    map.on('overlayremove', handleOverlayRemove)

    return () => {
      map.off('overlayadd', handleOverlayAdd)
      map.off('overlayremove', handleOverlayRemove)
      legend.remove()
      if (root) {
        root.unmount()
      }
    }
  }, [map])

  // Re-render when state changes
  useEffect(() => {
    const legendElement = document.querySelector('.map-legend')
    if (legendElement) {
      const root = createRoot(legendElement)
      root.render(
        <LegendContentComponent
          activeLayers={activeLayers}
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed((prev) => !prev)}
          filterStyle={filterStyle}
        />,
      )
      return () => {
        root.unmount()
      }
    }
  }, [activeLayers, isCollapsed, filterStyle])

  return null
}

export default MapLegend
