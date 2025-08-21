import type { FC } from 'react'
import { useParams } from 'react-router-dom'
import FullScreenLayout from '../../_components/FullScreenLayout'
import Header from './_components/Header'
import Dashboard from './_components/Dashboard'
import BottomSheet from './_components/BottomSheet'

const Home: FC = () => {
  const { tabId } = useParams<{ tabId?: string }>()

  return (
    <FullScreenLayout>
      <Header />
      <Dashboard currentTabId={tabId} />
      <BottomSheet />
    </FullScreenLayout>
  )
}

export default Home
