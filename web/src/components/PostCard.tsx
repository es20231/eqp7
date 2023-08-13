import * as Avatar from '@radix-ui/react-avatar'
import { Heart, HeartOff, UserCircle2 } from 'lucide-react'
import Image from 'next/image'

interface PostCardProps {
  image: {
    id: string
    userId: string
    subtitle: string
    imageId: string
  }
  token: string
}

const PostCard = ({ image, token }: PostCardProps) => {
  const userAvatar = ''
  return (
    <div className="flex flex-col bg-dark-slate-gray-500 bg-opacity-20 justify-center w-80 rounded-md">
      <div className="h-fit py-2 flex flex-row items-center">
        {userAvatar ? (
          <Avatar.Root>
            <Avatar.Image
              className="w-12 h-12 rounded-full ml-2"
              src={userAvatar}
              alt="User avatar"
            />
            <Avatar.Fallback />
          </Avatar.Root>
        ) : (
          <UserCircle2 className="w-11 h-11 rounded-full ml-2 stroke-1 bg-gray-600" />
        )}
        <section className="ml-2">
          <p>{image.userId}</p>
        </section>
      </div>
      <div className="h-80">
        <Image
          src={image.imageId}
          alt="Picture of the author"
          width={360}
          height={360}
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col h-28">
        <div className="flex flex-row justify-start items-center gap-x-3 px-4 h-[38%] ">
          <div className="flex flex-row items-center gap-x-2 h-full ">
            <button className="text-zinc-600 dark:text-slate-50 flex items-center h-full">
              <Heart />
            </button>
            <p className="text-sm mt-0.5 h-full flex items-center">{} </p>
          </div>
          <div className="flex flex-row items-center gap-x-2 h-full ">
            <button className="text-zinc-600 dark:text-slate-50 flex items-center h-full">
              <HeartOff />
            </button>
            <p className="text-sm mt-0.5 h-full flex items-center">{} </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center px-3 h-[62%]">
          <section className="flex flex-row items-start gap-x-2 w-full h-full">
            <p className="text-xs line-clamp-3 leading-5 px-1">
              <b className="pb-4 text-gray-200 ">{image.userId} </b>
              {image.subtitle}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export { PostCard }
