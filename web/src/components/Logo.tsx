'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import logoDark from '../../public/logo-dark.svg'
import logoImage from '../../public/logo-image.svg'
import logoLight from '../../public/logo-light.svg'

interface LogoProps {
  width?: number
  height?: number
  mode?: 'collapsed' | 'full'
}

const Logo = ({ width = 100, height = 100, mode = 'full' }: LogoProps) => {
  const { theme } = useTheme()

  if (mode === 'collapsed') {
    return (
      <div className="flex flex-col items-center justify-center">
        <Image src={logoImage} alt="Logo minig" width={width} height={height} />
      </div>
    )
  }

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
