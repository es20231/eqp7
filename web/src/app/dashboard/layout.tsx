import { Header } from '@/components/Header'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Dashboard',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-200 dark:bg-rich-black-500 overflow-hidden">
        {children}
      </div>
    </>
  )
}
