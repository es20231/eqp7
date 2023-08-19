import { Text } from '@/components/Text'
import { UserPostDTO, useDeletePost } from '@/queries/post.query'
import { queryClient } from '@/services/queryClient'
import { useUserStore } from '@/stores/user.store'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  NewCommentFormComponent,
  NewCommentFormProvider,
} from './Form/Providers/NewCommentForm'
import { PostCardOptions } from './PostCardOptions'
import { PostComments } from './PostComments'
import { ReactionCard } from './ReactionCard'
import { UserAvatar } from './UserAvatar'

interface PostCardProps {
  post: UserPostDTO
  token: string
}

const PostCard = ({ post, token }: PostCardProps) => {
  const { userInfo } = useUserStore((state) => state)
  const [postId, setPostId] = useState<string | undefined>()

  const { data: deletePost, isError: errorDeletePost } = useDeletePost({
    postId,
    token,
  })

  useEffect(() => {
    if (postId) {
      if (deletePost) {
        toast.success('Post removido com sucesso!')
        setPostId(undefined)
      } else {
        if (errorDeletePost) {
          setPostId(undefined)
          toast.error('Erro ao remover post!')
        }
      }
    }

    queryClient.invalidateQueries(['posts', { userId: userInfo?.id, token }])
  }, [postId, queryClient])

  return (
    <div className="flex flex-col dark:bg-dark-slate-gray-500 bg-gray-400/30 bg-opacity-50 justify-center py-1 w-full max-w-sm rounded-lg">
      <div className="px-4 py-2 flex flex-row items-center gap-2">
        <div className="h-10 w-10">
          <UserAvatar
            userImage={post.user.profilePicture || ''}
            exibitionName={post.user.fullName}
            height={36}
            width={36}
          />
        </div>
        <Text className="text-start flex-1">@{post.user.username}</Text>
        {userInfo?.id === post.userId ? (
          <PostCardOptions
            handleRemovePost={() => setPostId(post.id)}
            post={post}
          />
        ) : null}
      </div>
      <div className="px-2 h-56">
        <figure className={`filter-${post.image.filter}`}>
          <Image
            src={post.image.url}
            alt="Picture of the author"
            width={224}
            height={224}
            className="object-cover rounded-lg w-full h-full"
            unoptimized
          />
        </figure>
      </div>
      <div className="flex flex-col h-full">
        <ReactionCard for="post" record={post} token={token} />
        <div className="flex flex-col items-start px-3 h-16">
          <Text className="text-sm line-clamp-3 leading-5 text-left font-bold">
            {post.user.username}
          </Text>
          <Text className="text-sm text-start text-gray-500 dark:text-zinc-300">
            {post.subtitle}
          </Text>
        </div>
      </div>
      <div>
        <div className="w-full h-32 max-h-32">
          <PostComments postId={post.id} token={token} preview />
        </div>
        <NewCommentFormProvider postId={post.id} userId={userInfo?.id || ''}>
          <NewCommentFormComponent
            fullName={userInfo?.fullName || ''}
            userImage={userInfo?.profilePicture || ''}
            token={token}
          />
        </NewCommentFormProvider>
      </div>
    </div>
  )
}

export { PostCard }
