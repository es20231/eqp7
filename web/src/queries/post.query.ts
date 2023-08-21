import { PostReactionDTO } from '@/mutations/post-reaction.mutation'
import { api } from '@/services/axios'
import { QueryFunctionContext, useInfiniteQuery, useQuery } from 'react-query'

export type PostReactionsAmountDTO = {
  postId: string
  likes: number
  dislikes: number
}

export type UserPostDTO = {
  id: string
  subtitle: string
  imageId: string
  userId: string
  filter?: string
  createdAt: string
  updatedAt: string
  image: {
    url: string
  }
  user: {
    username: string
    fullName: string
    profilePicture: string
  }
}

type GetPostReactionsAmountQueryKey = [
  'post-reactions-amount',
  { postId: string; token: string },
]

const getPostReactionsAmount = async ({
  queryKey,
}: QueryFunctionContext<GetPostReactionsAmountQueryKey>) => {
  const [, { postId, token }] = queryKey

  const { data } = await api(token).get(`/post-reactions/post/${postId}/amount`)

  console.log('getPostReactionsAmountData', data)

  return data.payload as PostReactionsAmountDTO
}

interface UseGetPostReactionsAmountProps {
  postId: string
  token: string
}

const useGetPostReactionsAmount = ({
  postId,
  token,
}: UseGetPostReactionsAmountProps) => {
  return useQuery(
    ['post-reactions-amount', { postId, token }],
    getPostReactionsAmount,
    {
      enabled: false,
    },
  )
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
  pageParam = 1,
}: QueryFunctionContext<GetPostReactionsQueryKey>) => {
  const [, { postId, token }] = queryKey

  const take = 10

  const skip = (Math.max(pageParam, 1) - 1) * take

  const { data } = await api(token).get(
    `/post-reactions/post/${postId}?take=${take}&skip=${skip}`,
  )

  console.log('getPostReactionsData', data)

  return data.payload as PostReactionDTO[]
}

const useGetPostReactions = ({ postId, token }: GetPostReactionsProps) => {
  return useInfiniteQuery({
    queryKey: ['post-reactions', { postId, token }],
    queryFn: ({ pageParam, meta }) =>
      getPostReactions({
        pageParam,
        queryKey: ['post-reactions', { postId, token }],
        meta,
      }),
    enabled: false,
    keepPreviousData: true,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 10) {
        return undefined
      }

      return pages.length + 1
    },
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

export {
  useDeletePost,
  useDeletePostReaction,
  useGetPostReactions,
  useGetPostReactionsAmount,
}
