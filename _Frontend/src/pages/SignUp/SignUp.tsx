import type { FC } from 'react'
import { FullScreenLayout, MainLayout } from '../../_components'
import { SignUpForm } from './_components'

const SignUp: FC = () => {
  return (
    <FullScreenLayout>
      <MainLayout>
        <SignUpForm />
      </MainLayout>
    </FullScreenLayout>
  )
}

export default SignUp
