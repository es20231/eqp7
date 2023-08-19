import { api } from '@/services/axios'
import { useMutation } from 'react-query'
import { ReactionDTO } from './post-reaction.mutation'

export type CommentReactionDTO = ReactionDTO & {
  commentId: string
}

type CreateCommentReactionDTO = {
  type: string
  userId: string
  commentId: string
}

interface CreateCommentReactionProps {
  commentReaction: CreateCommentReactionDTO
  token: string
}

const createCommentReaction = async ({
  commentReaction,
  token,
}: CreateCommentReactionProps) => {
  const { data } = await api(token).post('/comment-reactions', commentReaction)

  const commentReactionCreated: CommentReactionDTO = data.payload

  return commentReactionCreated
}

const useCreateCommentReaction = () => {
  return useMutation(({ commentReaction, token }: CreateCommentReactionProps) =>
    createCommentReaction({ commentReaction, token }),
  )
}

export { useCreateCommentReaction }
