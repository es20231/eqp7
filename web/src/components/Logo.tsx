'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import logoDark from '../../public/logo-dark.svg'
import logoLight from '../../public/logo-light.svg'

interface LogoProps {
  width?: number
  height?: number
}

const Logo = ({ width = 100, height = 100 }: LogoProps) => {
  const { theme } = useTheme()

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={theme === 'light' ? logoLight : logoDark}
        alt="Logo minig"
        width={width}
        height={height}
      />
    </div>
  )
}

export { Logo }
