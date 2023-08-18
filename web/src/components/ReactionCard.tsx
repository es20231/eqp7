'use client'

import { useCreateCommentReaction } from '@/mutations/comment-reaction.mutation'
import { useCreatePostReaction } from '@/mutations/post-reaction.mutation'
import { PostCommentDTO, useGetCommentReactions } from '@/queries/comment.query'
import { UserPostDTO, useGetPostReactions } from '@/queries/post.query'
import { useUserStore } from '@/stores/user.store'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Button } from './Button'
import { Text } from './Text'

interface ReactionCardProps {
  for: 'post' | 'comment'
  token: string
  record: PostCommentDTO | UserPostDTO
}

const ReactionCard = ({ for: for_, token, record }: ReactionCardProps) => {
  const { userInfo } = useUserStore((state) => state)

  const {
    data: postReactions,
    isLoading: isLoadingPostReactions,
    isError: isErrorPostReactions,
    refetch: triggerPostReactions,
  } = useGetPostReactions({ postId: record.id, token })

  const {
    data: commentReactions,
    isLoading: isLoadingCommentReactions,
    isError: isErrorCommentReactions,
    refetch: triggerCommentReactions,
  } = useGetCommentReactions({ commentId: record.id, token })

  useEffect(() => {
    if (for_ === 'post') triggerPostReactions()
    else triggerCommentReactions()
  }, [
    commentReactions,
    postReactions,
    for_,
    triggerCommentReactions,
    triggerPostReactions,
  ])

  const { mutateAsync: postReactionMutate } = useCreatePostReaction()
  const { mutateAsync: commentReactionMutate } = useCreateCommentReaction()

  if (isLoadingPostReactions || isLoadingCommentReactions)
    return <Text>Loading...</Text>

  const recordReactions = for_ === 'post' ? postReactions : commentReactions

  if (
    isErrorPostReactions ||
    isErrorCommentReactions ||
    recordReactions === undefined
  )
    return <Text>Erro ao carregar reações</Text>

  const userReaction = recordReactions.find(
    (reaction) => reaction.userId === userInfo?.id,
  )?.type

  const likeAmount =
    recordReactions.filter((reaction) => reaction.type === 'like').length || 0

  const dislikeAmount =
    recordReactions.filter((reaction) => reaction.type === 'dislike').length ||
    0

  const handleCreateReaction = async (type: 'like' | 'dislike') => {
    if (userReaction) {
      toast.info('Você já reagiu a esse post')
      return
    }
    if (for_ === 'post') {
      await postReactionMutate(
        {
          postReaction: {
            type,
            postId: record.id,
            userId: userInfo?.id || '',
          },
          token,
        },
        {
          onSuccess: () => {
            toast.success('Reação registrada com sucesso!')
            triggerPostReactions()
          },
          onError: (err: any) => {
            console.log('ReactionCardError:', err)
            toast.error(err.response.data.message || 'Erro ao registrar reação')
          },
        },
      )
    } else {
      await commentReactionMutate(
        {
          commentReaction: {
            type,
            commentId: record.id,
            userId: userInfo?.id || '',
          },
          token,
        },
        {
          onSuccess: () => {
            toast.success('Reação registrada com sucesso!')

            triggerCommentReactions()
          },
          onError: (err: any) => {
            console.log('ReactionCardError:', err)
            toast.error(err.response.data.message || 'Erro ao registrar reação')
          },
        },
      )
    }
  }

  return (
    <div
      className="flex flex-row justify-start items-center gap-1 px-3 h-fit group data-[comment=true]:justify-center data-[comment=true]:px-2"
      data-comment={for_ === 'comment'}
    >
      <div className="flex flex-row items-center justify-center -gap-1 py-1 group-data-[comment=true]:py-0">
        <Button
          className="text-zinc-600 dark:text-slate-50 flex items-center h-full group-data-[comment=true]:h-6 group-data-[comment=true]:w-6 bg-transparent cursor-pointer px-1 dark:hover:bg-dark-slate-gray-400 hover:bg-slate-200"
          onClick={() => handleCreateReaction('like')}
        >
          <ThumbsUp
            strokeWidth={1.2}
            size={20}
            data-react={userReaction && userReaction === 'like'}
            className="transition-colors duration-200 ease-in-out data-[react=true]:text-[#1DAABB] dark:data-[react=true]:text-[#1DAABB] text-zinc-600 dark:text-slate-50"
            fill={
              userReaction && userReaction === 'like'
                ? '#1DAABB'
                : 'transparent'
            }
          />
        </Button>
        <Text className="text-sm group-data-[comment=true]:text-xs mt-0.5 h-full flex items-center">
          {likeAmount}
        </Text>
      </div>
      <div className="flex flex-row items-center justify-center -gap-1 h-full py-1 group-data-[comment=true]:py-0">
        <Button
          className="text-zinc-600 dark:text-slate-50 flex items-center h-full group-data-[comment=true]:h-6 group-data-[comment=true]:w-6 bg-transparent cursor-pointer px-1 dark:hover:bg-dark-slate-gray-400 hover:bg-slate-200"
          onClick={() => handleCreateReaction('dislike')}
        >
          <ThumbsDown
            strokeWidth={1.2}
            size={20}
            fill={
              userReaction && userReaction === 'dislike'
                ? '#ef4444'
                : 'transparent'
            }
            data-react={userReaction && userReaction === 'dislike'}
            className="transition-colors duration-200 ease-in-out data-[react=true]:text-[#ef4444] dark:data-[react=true]:text-[#ef4444] text-zinc-600 dark:text-slate-50"
          />
        </Button>
        <Text className="text-sm h-full flex items-center group-data-[comment=true]:text-xs">
          {dislikeAmount}
        </Text>
      </div>
    </div>
  )
}

export { ReactionCard }
