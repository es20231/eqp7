import { AppProvider } from '@/providers/app.provider'
import { Roboto_Mono as RobotoMono } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const roboto = RobotoMono({
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
  subsets: ['latin'],
  adjustFontFallback: true,
})

export const metadata = {
  title: {
    template: '%s | MinIG',
    default: 'MinIG',
  },
  description: 'Aplicação para compartilhamento de fotos e momentos.',
}

export default function RootLayout({
  children,
  session,
}: {
  children: ReactNode
  session: any
}) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <main className="w-screen h-screen flex flex-col items-center justify-start">
          <AppProvider NextAuthSession={session}>{children}</AppProvider>
        </main>
      </body>
    </html>
  )
}
