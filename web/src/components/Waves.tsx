import { useTheme } from 'next-themes'
import Image from 'next/image'
import wavesDark from '../../public/waves-dark.svg'
import wavesLight from '../../public/waves-light.svg'

const Waves = () => {
  const { theme } = useTheme()
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <Image
        src={theme === 'light' ? wavesLight : wavesDark}
        alt="Waves"
        width={1920}
        height={1080}
        className="w-full h-full"
      />
    </div>
  )
}

export { Waves }
