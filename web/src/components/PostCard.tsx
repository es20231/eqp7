import { Text } from '@/components/Text'
import { UserPostDTO } from '@/queries/post.query'
import { MoreHorizontal, ThumbsDown, ThumbsUp } from 'lucide-react'
import Image from 'next/image'
import { Button } from './Button'
import { UserAvatar } from './UserAvatar'

interface PostCardProps {
  post: UserPostDTO
  token: string
}

const PostCard = ({ post, token }: PostCardProps) => {
  return (
    <div className="flex flex-col dark:bg-dark-slate-gray-500 bg-gray-400/30 bg-opacity-50 justify-center w-full max-w-sm rounded-lg">
      <div className="px-4 py-2 grid grid-cols-[15%_1fr_10%] items-center">
        <div className="h-10 w-10">
          <UserAvatar
            userImage={post.user.profilePicture || ''}
            exibitionName={post.user.fullName}
            height={36}
            width={36}
          />
        </div>
        <Text className="text-start ">@{post.user.username}</Text>
        <Button className="text-zinc-600 dark:text-slate-50 flex items-center h-full bg-transparent cursor-pointer px-1 dark:hover:bg-dark-slate-gray-400 hover:bg-slate-200">
          <MoreHorizontal />
        </Button>
      </div>
      <div className="px-2 h-80">
        <Image
          src={post.image.url}
          alt="Picture of the author"
          width={360}
          height={360}
          className="object-cover rounded-lg w-full h-full"
        />
      </div>
      <div className="flex flex-col h-full pb-4">
        <div className="flex flex-row justify-end items-center gap-3 px-4 h-fit">
          <div className="flex flex-row items-center justify-center gap-1 py-1">
            <Button className="text-zinc-600 dark:text-slate-50 flex items-center h-full bg-transparent cursor-pointer px-1 dark:hover:bg-dark-slate-gray-400 hover:bg-slate-200">
              <ThumbsUp
                strokeWidth={1.2}
                // fill="#1DAABB" stroke="#1DAABB"
              />
            </Button>
            <Text className="text-sm mt-0.5 h-full flex items-center">{5}</Text>
          </div>
          <div className="flex flex-row items-center justify-center gap-1 h-full py-1">
            <Button className="text-zinc-600 dark:text-slate-50 flex items-center h-full bg-transparent cursor-pointer px-1 dark:hover:bg-dark-slate-gray-400 hover:bg-slate-200">
              <ThumbsDown
                strokeWidth={1.2}
                // fill="#f60000" stroke="#f60000"
              />
            </Button>
            <Text className="text-sm h-full flex items-center">{20}</Text>
          </div>
        </div>
        <div className="flex flex-col items-start px-3 h-[62%]">
          <Text className="text-sm line-clamp-3 leading-5 text-left font-bold">
            {post.user.username}
          </Text>
          <Text className="text-sm text-start text-gray-500 dark:text-zinc-300">
            {post.subtitle}
          </Text>
        </div>
      </div>
    </div>
  )
}

export { PostCard }
