import type { FC } from 'react'
import Button from '../../../../../../../_components/Button'
import type { TabData } from '../index'

interface TabProps {
  tab: TabData
}

const Tab: FC<TabProps> = ({ tab }) => <Button>{tab.title}</Button>

export default Tab
