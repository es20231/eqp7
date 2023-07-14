import { AppProvider } from '@/providers/app.provider'
import { Roboto_Mono as RobotoMono } from 'next/font/google'
import './globals.css'

const roboto = RobotoMono({
  weight: ['400', '500', '700'],
  preload: true,
  subsets: ['latin'],
  adjustFontFallback: true,
})

export const metadata = {
  title: 'Min IG',
  description: 'Aplicação para compartilhamento de fotos e momentos.',
}

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode
  session: any
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppProvider NextAuthSession={session}>{children}</AppProvider>
      </body>
    </html>
  )
}
