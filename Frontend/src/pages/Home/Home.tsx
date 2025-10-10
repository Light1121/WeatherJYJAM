import type { FC } from 'react'
import { FullScreenLayout, MainLayout } from '../../_components'
import Dashboard from './_components/Dashboard'
import BottomSheet from './_components/BottomSheet'

const Home: FC = () => {
  return (
    <FullScreenLayout>
      <MainLayout>
        <Dashboard />
        <BottomSheet />
      </MainLayout>
    </FullScreenLayout>
  )
}

export default Home
