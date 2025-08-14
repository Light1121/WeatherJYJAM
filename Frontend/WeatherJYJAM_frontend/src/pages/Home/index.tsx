import type { FC } from 'react'
import Header from './_components/Header'
import MapContainer from './_components/MapContianer'
import BottomSheet from './_components/BottomSheet'

const Home: FC = () => (
  <>
    <Header />
    <MapContainer />
    <BottomSheet />
  </>
)

export default Home