import type { FC } from 'react'
import TabSidebar from './_components/TabSidebar'
import MapView from './_components/MapView'

const MapContainer: FC = () => (
  <div>
    <TabSidebar />
    <MapView />
  </div>
)

export default MapContainer