import { PostCard } from '@/components/PostCard'
import { Text } from '@/components/Text'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { ImageOff } from 'lucide-react'

import { Error } from '@/components/Error'
import { useGetUserPosts } from '@/queries/user.query'

interface UserPostsProps {
  userId: string
  token: string
  preview?: boolean
}

const UserPosts = ({ userId, token, preview = false }: UserPostsProps) => {
  const { data, isLoading, isError } = useGetUserPosts({ token, userId })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError || !data)
    return <Error message="Ocorreu um erro ao carregar as imagens do usuário" />

  const userPosts = preview ? data.slice(0, 5) : data

  return (
    <ScrollArea.Root className="w-full h-[85%]">
      <ScrollArea.Viewport className="w-full h-full py-3 px-4">
        {userPosts.length > 0 ? (
          <div className="flex flex-col items-center sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
            {userPosts.map((post) => (
              <PostCard post={post} key={post.id} token={post.userId} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full gap-4 pt-10">
            <ImageOff className="text-zinc-600 dark:text-slate-50" size={64} />
            <Text className="text-center">
              Você ainda não possui nenhum post, que tal criar um novo?
            </Text>
          </div>
        )}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        orientation="vertical"
        className="flex select-none touch-none p-0.5 bg-slate-100 dark:bg-zinc-800 transition-colors duration-[160ms] ease-out hover:bg-slate-200 dark:hover:bg-zinc-950 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      >
        <ScrollArea.Thumb className="flex-1 dark:bg-slate-100 bg-zinc-700/80 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}

export { UserPosts }
