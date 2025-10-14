import styled from 'styled-components'

// ---------- Styled Components ----------
const DetailsContainer = styled.div`
  flex: 1;
  background-color: #f6fcff;
  padding: 2rem;
  margin: 1rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(32, 15, 15, 0.2);
  overflow: auto;
`

const FadeDiv = styled.div<{ $visible: boolean; $delay?: number }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.5s ease
    ${({ $delay }) => ($delay ? `${$delay}ms` : '0ms')};
`

const HeaderSection = styled.div`
  padding: 1rem 2rem;
  background-color: #c2e9ff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 2rem;
  font-family: 'Instrument Sans', sans-serif;
  text-align: center;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`

const ContentGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const GraphSection = styled.div`
  background-color: #c2e9ff;
  border-radius: 1rem;
  padding: 1rem 1.5rem 2.5rem 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Instrument Sans', sans-serif;
`

const GraphTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
`

const GraphBox = styled.div`
  width: 100%;
  background-color: #fffffff6;
  border: 1px dashed #ddd;
  border-radius: 10px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch; // ensures children fill width
  color: #666;
  font-size: 14px;
  margin-bottom: 1rem;
  padding: 0.5rem;
`

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`

const SliderLabel = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
  color: #333;
`

const TimeSlider = styled.input`
  width: 100%;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  outline: none;
  appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    background: #007acc;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: #007acc;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
`

const Spinner = styled.div`
  border: 4px solid #eee;
  border-top: 4px solid #007acc;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

const TimeDisplay = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #007acc;
  background-color: #fffffff6;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`
const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
`

const RangeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RangeLabel = styled.span`
  font-size: 0.9rem;
  color: #555;
`

const RangeValue = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #007acc;
`

const TrackContainer = styled.div`
  width: 100%;
  display: flex;
  height: 6px;
  align-items: center;
`

const Track = styled.div<{ background: string }>`
  height: 12px;
  width: 100%;
  border-radius: 4px;
  background: ${({ background }) => background};
  display: flex;
  align-items: bottom;
`

// const Thumb = styled.div.withConfig({
//   shouldForwardProp: (prop) => prop !== 'isDragged'
// })<{ isDragged: boolean }>`
//   height: 12px;
//   width: 12px;
//   border-radius: 50%;
//   background-color: ${({ isDragged }) => (isDragged ? "#005fa3" : "#007acc")};
//   box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
//   transition: transform 0s ease;
//   transform: ${({ isDragged }) => (isDragged ? "scale(1)" : "scale(1)")};
//   cursor: pointer;

// `;

const Thumb = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isDragged',
})<{ isDragged: boolean }>`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background-color: ${({ isDragged }) => (isDragged ? '#005fa3' : '#007acc')};
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:hover {
    transform: ${({ isDragged }) => (isDragged ? 'scale(1.5)' : 'scale(1.2)')};
  }
`

const YearLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
  width: 100%;
`

export {
  DetailsContainer,
  FadeDiv,
  HeaderSection,
  Title,
  ContentGrid,
  GraphSection,
  GraphTitle,
  GraphBox,
  SliderContainer,
  SliderLabel,
  TimeSlider,
  Spinner,
  TimeDisplay,
  RangeContainer,
  RangeHeader,
  RangeLabel,
  RangeValue,
  Track,
  Thumb,
  YearLabels,
  TrackContainer,
}
