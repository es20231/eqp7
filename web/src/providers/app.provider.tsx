'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface AppProviderProps {
  children: ReactNode
  NextAuthSession: any
}

const AppProvider = ({ children, NextAuthSession }: AppProviderProps) => {
  return <SessionProvider session={NextAuthSession}>{children}</SessionProvider>
}

export { AppProvider }
