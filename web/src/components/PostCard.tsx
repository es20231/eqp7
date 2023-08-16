import { Text } from '@/components/Text'
import { UserPostDTO } from '@/queries/post.query'
import * as Avatar from '@radix-ui/react-avatar'
import { Heart, HeartOff, UserCircle2 } from 'lucide-react'
import Image from 'next/image'

interface PostCardProps {
  post: UserPostDTO
  token: string
}

const PostCard = ({ post, token }: PostCardProps) => {
  const userAvatar = ''
  return (
    <div className="flex flex-col dark:bg-dark-slate-gray-500 bg-slate-400 bg-opacity-50 justify-center w-80 rounded-md">
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
          <UserCircle2 className="w-11 h-11 rounded-full ml-2 stroke-1 bg-gray-400 dark:bg-gray-600" />
        )}
        <section className="ml-2">
          <Text>@{post.user.username}</Text>
        </section>
      </div>
      <div className="h-80">
        <Image
          src={post.image.url}
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
            <Text className="text-sm mt-0.5 h-full flex items-center">{} </Text>
          </div>
          <div className="flex flex-row items-center gap-x-2 h-full ">
            <button className="text-zinc-600 dark:text-slate-50 flex items-center h-full">
              <HeartOff />
            </button>
            <Text className="text-sm mt-0.5 h-full flex items-center">{} </Text>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center px-3 h-[62%]">
          <section className="flex flex-row items-start gap-x-2 w-full h-full">
            <Text className="text-xs line-clamp-3 leading-5 px-1 text-left">
              <b className="pb-4 text-gray-800 dark:text-gray-200">
                {post.user.username}{' '}
              </b>
              {post.subtitle}
            </Text>
          </section>
        </div>
      </div>
    </div>
  )
}

export { PostCard }
