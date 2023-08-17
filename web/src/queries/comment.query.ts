import { api } from '@/services/axios';
import { QueryFunctionContext, useQuery } from 'react-query';

type GetPostCommentsQueryKey = ['comments', { token: string; postId: string }]

export type PostCommentDTO = {
  id: string
  content: string
  userId: string
  postId: string

  user?: {
    username: string
    profilePicture: string
  }

  reactions?: any[]
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

export { useGetPostComments };

