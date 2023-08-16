import { PostCommentDTO } from '@/queries/post.query'

interface PostCommentsProps {
  token: string
  postId: string
  preview?: boolean
}

const PostComments = ({
  token,
  postId,
  preview = false,
}: PostCommentsProps) => {
  return <p>Post comments</p>
}

interface PreviewPostCommentsProps {
  comments: PostCommentDTO[]
}

const PreviewPostComments = ({ comments }: PreviewPostCommentsProps) => {
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center px-2">
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
    </div>
  )
}

interface CommentCardProps {
  comment: PostCommentDTO
}

const CommentCard = ({ comment }: CommentCardProps) => {
  return <p>{comment.content}</p>
}

export { PostComments }
