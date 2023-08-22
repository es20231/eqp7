import { api } from '@/services/axios'
import { QueryFunctionContext, useInfiniteQuery, useQuery } from 'react-query'

type GetPostCommentsQueryKey = ['comments', { token: string; postId: string }]

export type PostCommentDTO = {
  id: string
  content: string
  userId: string
  postId: string

  post: {
    userId: string
  }

  user: {
    username: string
    profilePicture: string
  }
}

const getPostComments = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<GetPostCommentsQueryKey>) => {
  const [, { token, postId }] = queryKey

  const take = 5

  const skip = (Math.max(pageParam, 1) - 1) * take

  const { data } = await api(token).get(
    `/comments/post/${postId}${`?take=${take}&skip=${skip}`}`,
  )

  console.log('getPostCommentsData', data)

  return data.payload as PostCommentDTO[]
}

interface UseGetPostCommentsProps {
  token: string
  postId: string
}

const useGetPostComments = ({ token, postId }: UseGetPostCommentsProps) => {
  return useInfiniteQuery({
    queryKey: ['comments', { token, postId }],
    queryFn: ({ pageParam, meta }) =>
      getPostComments({
        pageParam,
        queryKey: ['comments', { token, postId }],
        meta,
      }),
    keepPreviousData: true,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 5) {
        return undefined
      }

      return pages.length + 1
    },
  })
}

type GetCommentReactionsQueryKey = [
  'comment-reactions',
  { commentId: string; token: string },
]

export type CommentReactionDTO = {
  id: string
  type: string
  userId: string
  commentId: string
  user: {
    username: string
    profilePicture: string
  }
}

export type CommentReactionsAmountDTO = {
  commentId: string
  likes: number
  dislikes: number
}

type GetCommentReactionsAmountQueryKey = [
  'comment-reactions-amount',
  { commentId: string; token: string },
]

const getCommentReactionsAmount = async ({
  queryKey,
}: QueryFunctionContext<GetCommentReactionsAmountQueryKey>) => {
  const [, { commentId, token }] = queryKey

  const { data } = await api(token).get(
    `/comment-reactions/comment/${commentId}/amount`,
  )

  console.log('getCommentReactionsAmountData', data)

  return data.payload as CommentReactionsAmountDTO
}

interface UseGetCommentReactionsAmountProps {
  commentId: string
  token: string
}

const useGetCommentReactionsAmount = ({
  commentId,
  token,
}: UseGetCommentReactionsAmountProps) => {
  return useQuery(
    ['comment-reactions-amount', { commentId, token }],
    getCommentReactionsAmount,
    {
      enabled: false,
    },
  )
}

const getCommentReactions = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<GetCommentReactionsQueryKey>) => {
  const [, { commentId, token }] = queryKey

  const take = 5

  const skip = (Math.max(pageParam, 1) - 1) * take

  const { data } = await api(token).get(
    `/comment-reactions/comment/${commentId}${`?take=${take}&skip=${skip}`}`,
  )

  console.log('getCommentReactionsData', data)

  return data.payload as CommentReactionDTO[]
}

interface UseGetCommentReactionsProps {
  commentId: string
  token: string
}

const useGetCommentReactions = ({
  commentId,
  token,
}: UseGetCommentReactionsProps) => {
  return useInfiniteQuery({
    queryKey: ['comment-reactions', { commentId, token }],
    queryFn: ({ pageParam, meta }) =>
      getCommentReactions({
        meta,
        queryKey: ['comment-reactions', { commentId, token }],
        pageParam,
      }),
    enabled: false,
    keepPreviousData: true,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 5) {
        return undefined
      }

      return pages.length + 1
    },
  })
}

type DeleteCommentQueryKey = [{ commentId: string; token: string }]

const deleteComment = async ({
  queryKey,
}: QueryFunctionContext<DeleteCommentQueryKey>) => {
  const [{ commentId, token }] = queryKey

  const { data } = await api(token).delete(`/comments/${commentId}`)

  console.log('deleteCommentData', data)

  return data.message
}

interface UseDeleteCommentProps {
  commentId: string | undefined
  token: string
}

const useDeleteComment = ({ commentId, token }: UseDeleteCommentProps) => {
  return useQuery([{ commentId: commentId || '', token }], deleteComment, {
    enabled: commentId !== undefined,
  })
}

type DeleteCommentReactionQueryKey = [{ reactionId: string; token: string }]

const deleteCommentReaction = async ({
  queryKey,
}: QueryFunctionContext<DeleteCommentReactionQueryKey>) => {
  const [{ reactionId, token }] = queryKey

  const { data } = await api(token).delete(`/comment-reactions/${reactionId}`)

  console.log('deleteCommentReactionData', data)

  return data.message
}

interface UseDeleteReactionCommentProps {
  reactionId: string | undefined
  token: string
}

const useDeleteCommentReaction = ({
  reactionId,
  token,
}: UseDeleteReactionCommentProps) => {
  return useQuery(
    [{ reactionId: reactionId || '', token }],
    deleteCommentReaction,
    {
      enabled: reactionId !== undefined,
    },
  )
}

export {
  useDeleteComment,
  useDeleteCommentReaction,
  useGetCommentReactions,
  useGetCommentReactionsAmount,
  useGetPostComments,
}
