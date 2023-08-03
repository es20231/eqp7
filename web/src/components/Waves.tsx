import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Suspense } from 'react'
import wavesDark from '../../public/waves-dark.svg'
import wavesLight from '../../public/waves-light.svg'

const Waves = () => {
  const { theme } = useTheme()

  return (
    <Suspense fallback={null}>
      <div className="absolute bottom-0 left-0 w-full z-0">
        <Image
          src={theme === 'light' ? wavesLight : wavesDark}
          alt="Waves"
          width={1920}
          height={1080}
          className="w-full h-full"
        />
      </div>
    </Suspense>
  )
}

export { Waves }
