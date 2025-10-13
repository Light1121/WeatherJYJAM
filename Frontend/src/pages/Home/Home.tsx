import type { FC } from 'react'
import { FullScreenLayout, MainLayout } from '../../_components'
import Dashboard from './_components/Dashboard'

const Home: FC = () => {
  return (
    <FullScreenLayout>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </FullScreenLayout>
  )
}

export default Home
