'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface AppProviderProps {
  children: ReactNode
  NextAuthSession: any
}

const AppProvider = ({ children, NextAuthSession }: AppProviderProps) => {
  return (
    <SessionProvider session={NextAuthSession}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
      <ToastContainer
        autoClose={3000}
        closeButton
        pauseOnHover
        newestOnTop
        closeOnClick
        position="top-right"
      />
    </SessionProvider>
  )
}

export { AppProvider }
