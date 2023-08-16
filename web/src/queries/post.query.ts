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
  }
  user: {
    id: string
    username: string
    fullName: string
    profilePicture: string
  }
}

type GetPostCommentsQueryKey = ['comments', { token: string; postId: string }]

export type PostCommentDTO = {
  id: string
  content: string
  userId: string
  postId: string

  reactions?: any[]
}

const getPostComments = async ({
  queryKey,
}: QueryFunctionContext<GetPostCommentsQueryKey>) => {
  const [, { token, postId }] = queryKey

  const { data } = await api(token).get(`/posts/${postId}/comments`)

  return data.payload as PostCommentDTO[]
}

interface UseGetPostCommentsProps {
  token: string
  postId: string
}

const useGetPostComments = ({ token, postId }: UseGetPostCommentsProps) => {
  return useQuery(['comments', { token, postId }], getPostComments)
}

export { useGetPostComments }
