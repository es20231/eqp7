import { ReactNode } from 'react'

export const metadata = {
  title: 'Meus Posts',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 dark:bg-rich-black-500">
      {children}
    </div>
  )
}
