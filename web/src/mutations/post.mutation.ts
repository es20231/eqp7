import { UserPostDTO } from '@/queries/post.query'
import { api } from '@/services/axios'
import { useMutation } from 'react-query'

export type CreatePostDTO = {
  subtitle: string
  userId: string
  imageId: string
}

interface CreatePostProps {
  post: CreatePostDTO
  token: string
}

const createPost = async ({ post, token }: CreatePostProps) => {
  const { data } = await api(token).post('/posts', post)

  const posts: UserPostDTO = data.payload

  return posts
}

const useCreatePost = () => {
  return useMutation(
    ({ post, token }: CreatePostProps) => createPost({ post, token }),
    {
      // onSuccess: () => {
      //   queryClient.invalidateQueries(['posts'])
      // }
    },
  )
}

export { useCreatePost }
