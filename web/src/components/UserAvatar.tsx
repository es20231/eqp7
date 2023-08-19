import * as Avatar from '@radix-ui/react-avatar'
import Image from 'next/image'

interface UserAvatarProps {
  userImage: string
  exibitionName: string
  width?: number
  height?: number
}

const UserAvatar = ({
  userImage,
  exibitionName,
  height = 10,
  width = 10,
}: UserAvatarProps) => {
  const fallbackAvatar =
    exibitionName.split(' ').length === 1
      ? exibitionName.charAt(0)
      : exibitionName
          .split(' ')
          .map((name) => name.charAt(0))
          .join('')

  return (
    <Avatar.Root
      className={`border-[2px] rounded-full border-pacific-blue-500 overflow-hidden flex items-center justify-center max-h-[${height}px] max-w-[${width}px] bg-slate-600 h-full w-full`}
    >
      <Avatar.Image
        asChild
        src={userImage}
        width={width}
        height={height}
        className="object-cover w-full h-full"
      >
        <Image
          src={userImage}
          alt={'User profile picture'}
          width={width}
          height={height}
          className="object-cover w-full h-full"
          unoptimized
        />
      </Avatar.Image>
      <Avatar.AvatarFallback
        className="text-slate-50 data-[textlarge=true]:text-7xl"
        data-textlarge={width !== 10 && height !== 10}
      >
        {fallbackAvatar}
      </Avatar.AvatarFallback>
    </Avatar.Root>
  )
}

export { UserAvatar }
