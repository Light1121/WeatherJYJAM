import type { FC } from 'react'
import FullScreenLayout from '../../_components/FullScreenLayout'
import Header from './_components/Header'
import MapContainer from './_components/MapContianer'
import BottomSheet from './_components/BottomSheet'

const Home: FC = () => (
  <FullScreenLayout>
    <Header />
    <MapContainer />
    <BottomSheet />
  </FullScreenLayout>
)

export default Home
