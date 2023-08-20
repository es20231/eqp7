import { UserPostDTO } from '@/queries/post.query'
import { api } from '@/services/axios'
import { useMutation } from 'react-query'

export type CreatePostDTO = {
  subtitle: string
  userId: string
  filter?: string
  imageId: string
}

interface CreatePostProps {
  post: CreatePostDTO
  token: string
}

const createPost = async ({ post, token }: CreatePostProps) => {
  const { data } = await api(token).post('/posts', post)

  const postCreated: UserPostDTO = data.payload

  return postCreated
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

export type UpdatePostDTO = {
  subtitle?: string
  filter?: string
  id: string
}

interface UpdatePostProps {
  post: UpdatePostDTO
  token: string
}

const updatePost = async ({ post, token }: UpdatePostProps) => {
  const { data } = await api(token).patch(`/posts/${post.id}`, {
    ...post,
    id: undefined,
  })

  const postUpdated: UserPostDTO = data.payload

  return postUpdated
}

const useUpdatePost = () => {
  return useMutation(({ post, token }: UpdatePostProps) =>
    updatePost({ post, token }),
  )
}

export { useCreatePost, useUpdatePost }
