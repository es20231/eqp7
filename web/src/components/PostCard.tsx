import * as Avatar from '@radix-ui/react-avatar'
import { Heart, HeartOff, UserCircle2 } from 'lucide-react'
import Image from 'next/image'

interface PostCardProps {
  image: {
    id: string
    userId: string
    url: string
    likes: number
    dislikes: number
    subtitle: string
    createdAt: string
  }
  token: string
}

const PostCard = ({ image, token }: PostCardProps) => {
  const userAvatar = ''
  return (
    <div className="flex flex-col bg-dark-slate-gray-500 bg-opacity-20 justify-center w-80 rounded-md">
      <div className="h-fit pb-3 flex flex-row items-center">
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
          src={image.url}
          alt="Picture of the author"
          width={360}
          height={360}
          className="w-full h-full"
        />
      </div>
      <div className="h-1/6">
        <div className="flex flex-row justify-between items-center px-4 py-2">
          <div className="flex flex-row items-center gap-2">
            <button className="text-zinc-600 dark:text-slate-50 h-24">
              <Heart />
            </button>
            <p>{image.likes} </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <button className="text-zinc-600 dark:text-slate-50 h-24">
              <HeartOff />
            </button>
            <p>{image.dislikes} </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { PostCard }
