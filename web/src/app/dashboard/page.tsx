'use client'

import { useUserStore } from '@/stores/user.store'
import { useSession } from 'next-auth/react'
import { Suspense, useEffect } from 'react'

const Dashboard = () => {
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
        <div>
          <h1>Dashboard</h1>
          <h2>{userInfo?.id}</h2>
          <h2>{userInfo?.fullName}</h2>
          <h2>{userInfo?.email}</h2>
          <h2>{userInfo?.username}</h2>
          <h2>{userInfo?.emailVerified}</h2>
        </div>
      </Suspense>
    )
  )
}

export default Dashboard
