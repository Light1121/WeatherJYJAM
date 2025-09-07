import type { FC } from 'react'
import { FullScreenLayout, MainLayout } from '../../_components'
import { LoginForm } from './_components'

const Login: FC = () => {
  return (
    <FullScreenLayout>
      <MainLayout>
        <LoginForm />
      </MainLayout>
    </FullScreenLayout>
  )
}

export default Login
