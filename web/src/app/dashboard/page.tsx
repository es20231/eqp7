'use client'

import { Button } from '@/components/Button'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { UserImages } from '@/components/UserImages'
import { useUserStore } from '@/stores/user.store'
import { signOut, useSession } from 'next-auth/react'
import { Suspense, useEffect } from 'react'

const Dashboard = () => {
  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      signOut()
    }
  }

  const { data } = useSession()

  const { userInfo, setUserInfo } = useUserStore((state) => state)

  useEffect(() => {
    if (data) {
      setUserInfo({
        ...data.user,
      })
    }
  }, [])

  console.log('userInfo: ', data)

  return (
    userInfo && (
      <Suspense fallback={<div>Carregando...</div>}>
        <ThemeSwitch />
        <div>
          <h1>Dashboard</h1>
          <h2>{userInfo?.id}</h2>
          <h2>{userInfo?.fullName}</h2>
          <h2>{userInfo?.email}</h2>
          <h2>{userInfo?.username}</h2>
          <h2>{userInfo?.emailVerified}</h2>
          <Button onClick={handleSignOut}>Sair</Button>
        </div>
        <div className="">
          <UserImages token={userInfo.token} userId={userInfo.id} />
        </div>
      </Suspense>
    )
  )
}

export default Dashboard
