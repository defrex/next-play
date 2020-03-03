import { NextPage } from 'next'
import { useEffect, useMemo } from 'react'
import { nhost } from '../lib/nhost'
import 'antd/dist/antd.css'

interface LoginPageProps {}

const LoginPage: NextPage<LoginPageProps> = ({}: LoginPageProps) => {
  const auth = useMemo(() => nhost.auth(), [])

  useEffect(() => {
    auth.onAuthStateChanged((data: any) => {
      console.log('auth state changed!')
      console.log({ data })
    })
  }, [auth])

  return <div />
}

export default LoginPage
