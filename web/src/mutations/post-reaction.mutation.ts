import { api } from '@/services/axios'
import { useMutation } from 'react-query'

export type ReactionDTO =
  | {
      id: string
      type: string
      userId: string

      user: {
        username: string
        profilePicture: string
      }
    } & ({ postId: string } | { commentId: string })

export type PostReactionDTO = ReactionDTO & {
  postId: string
}

export type CreatePostReactionDTO = {
  type: string
  userId: string
  postId: string
}

interface CreatePostReactionProps {
  postReaction: CreatePostReactionDTO
  token: string
}

const createPostReaction = async ({
  postReaction,
  token,
}: CreatePostReactionProps) => {
  const { data } = await api(token).post('/post-reactions', postReaction)

  const postReactionCreated: PostReactionDTO = data.payload

  return postReactionCreated
}

const useCreatePostReaction = () => {
  return useMutation(({ postReaction, token }: CreatePostReactionProps) =>
    createPostReaction({ postReaction, token }),
  )
}

export { useCreatePostReaction }
