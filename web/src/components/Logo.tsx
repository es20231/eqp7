import Image from 'next/image'

const Logo = () => {
  return (
    <div>
      <Image
        className="text-sm text-slate-200 flex items-center justify-between"
        src="/logo-min-ig-light-mode.svg"
        alt="MinIg Logo"
        priority
        width={244}
        height={103}
      />
    </div>
  )
}

export { Logo }

