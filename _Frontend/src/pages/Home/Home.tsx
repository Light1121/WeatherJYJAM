import type { FC } from 'react'
import { useParams } from 'react-router-dom'
import { FullScreenLayout, MainLayout } from '../../_components'
import Dashboard from './_components/Dashboard'
import BottomSheet from './_components/BottomSheet'

const Home: FC = () => {
  const { tabId } = useParams<{ tabId?: string }>()

  return (
    <FullScreenLayout>
      <MainLayout>
        <Dashboard currentTabId={tabId} />
        <BottomSheet />
      </MainLayout>
    </FullScreenLayout>
  )
}

export default Home
