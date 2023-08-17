import { PostCommentDTO } from '@/queries/comment.query'
import { api } from '@/services/axios'
import { useMutation } from 'react-query'

export type CreateCommentDTO = {
  content: string
  userId: string
  postId: string
}

interface CreateCommentProps {
  comment: CreateCommentDTO
  token: string
}

const createComment = async ({ comment, token }: CreateCommentProps) => {
  const { data } = await api(token).post('/comments', comment)

  const commentCreated: PostCommentDTO = data.payload

  return commentCreated
}

const useCreateComment = () => {
  return useMutation(
    ({ comment, token }: CreateCommentProps) =>
      createComment({ comment, token }),
    {
      // onSuccess: () => {
      //   queryClient.invalidateQueries(['posts'])
      // }
    },
  )
}

export { useCreateComment }
