'use client'

import { Button } from '@/components/Button'
import { signOut } from 'next-auth/react'

const Dashboard = () => {
  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      signOut()
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleSignOut}>Sair</Button>
    </div>
  )
}

export default Dashboard
