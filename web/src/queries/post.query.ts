import { PostReactionDTO } from '@/mutations/post-reaction.mutation'
import { api } from '@/services/axios'
import { QueryFunctionContext, useQuery } from 'react-query'

export type UserPostDTO = {
  id: string
  subtitle: string
  imageId: string
  userId: string
  createdAt: string
  updatedAt: string
  image: {
    url: string
    filter?: string
  }
  user: {
    username: string
    fullName: string
    profilePicture: string
  }
}

type GetPostReactionsQueryKey = [
  'post-reactions',
  { postId: string; token: string },
]

interface GetPostReactionsProps {
  postId: string
  token: string
}

const getPostReactions = async ({
  queryKey,
}: QueryFunctionContext<GetPostReactionsQueryKey>) => {
  const [, { postId, token }] = queryKey

  const { data } = await api(token).get(`/post-reactions/post/${postId}`)

  console.log('getPostReactionsData', data)

  return data.payload as PostReactionDTO[]
}

const useGetPostReactions = ({ postId, token }: GetPostReactionsProps) => {
  return useQuery(['post-reactions', { postId, token }], getPostReactions, {
    enabled: false,
  })
}

type DeletePostQueryKey = [{ token: string; postId: string }]

const deletePost = async ({
  queryKey,
}: QueryFunctionContext<DeletePostQueryKey>) => {
  const [{ token, postId }] = queryKey

  const { data } = await api(token).delete(`/posts/${postId}`)

  console.log('deletePostData', data)

  return data.message
}

interface UseDeletePostProps {
  token: string
  postId: string | undefined
}

const useDeletePost = ({ token, postId }: UseDeletePostProps) => {
  return useQuery([{ token, postId: postId || '' }], deletePost, {
    enabled: postId !== undefined,
  })
}

type DeletePostReactionQueryKey = [{ reactionId: string; token: string }]

const deletePostReaction = async ({
  queryKey,
}: QueryFunctionContext<DeletePostReactionQueryKey>) => {
  const [{ reactionId, token }] = queryKey

  const { data } = await api(token).delete(`/post-reactions/${reactionId}`)

  console.log('deleteCommentReactionData', data)

  return data.message
}

interface UseDeletePostReactionProps {
  reactionId: string | undefined
  token: string
}

const useDeletePostReaction = ({
  reactionId,
  token,
}: UseDeletePostReactionProps) => {
  return useQuery(
    [{ reactionId: reactionId || '', token }],
    deletePostReaction,
    {
      enabled: reactionId !== undefined,
    },
  )
}

export { useDeletePost, useDeletePostReaction, useGetPostReactions }
