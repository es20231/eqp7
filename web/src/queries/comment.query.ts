import { api } from '@/services/axios';
import { QueryFunctionContext, useQuery } from 'react-query';

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
}: QueryFunctionContext<GetPostCommentsQueryKey>) => {
  const [, { token, postId }] = queryKey

  const { data } = await api(token).get(`/comments/post/${postId}`)

  console.log('getPostCommentsData', data)

  return data.payload as PostCommentDTO[]
}

interface UseGetPostCommentsProps {
  token: string
  postId: string
}

const useGetPostComments = ({ token, postId }: UseGetPostCommentsProps) => {
  return useQuery(['comments', { token, postId }], getPostComments)
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

const getCommentReactions = async ({
  queryKey,
}: QueryFunctionContext<GetCommentReactionsQueryKey>) => {
  const [, { commentId, token }] = queryKey

  const { data } = await api(token).get(
    `/comment-reactions/comment/${commentId}`,
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
  return useQuery(
    ['comment-reactions', { commentId, token }],
    getCommentReactions,
    { enabled: false },
  )
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
  useGetPostComments
};

