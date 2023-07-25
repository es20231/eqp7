import Image from 'next/image'

const Waves = () => {
  return (
    <>
      <Image
        src="/wave-green.svg"
        alt="MinIg Logo"
        width={1}
        height={1}
        className="w-full fixed bottom-0"
      />
      <Image
        src="/wave-blue.svg"
        alt="MinIg Logo"
        width={1}
        height={1}
        className="w-full fixed bottom-0"
      />
    </>
  )
}

export { Waves }

