import { PostCommentDTO, useGetPostComments } from '@/queries/comment.query'
import { MessagesSquare, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Button } from './Button'
import { Error } from './Error'
import { Text } from './Text'
import { UserAvatar } from './UserAvatar'

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
  const {
    data: comments,
    isLoading,
    isError,
  } = useGetPostComments({ token, postId })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError || comments === undefined) {
    return <Error message="Erro ao carregar os comentários do post" />
  }

  const commentsPreview = comments.slice(0, 2)

  if (preview) return <PreviewPostComments comments={commentsPreview} />

  return (
    <div>
      <p>comments</p>
      {comments.length ? (
        comments.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))
      ) : (
        <div className="flex flex-col w-full px-4 items-center justify-center gap-2">
          <MessagesSquare
            className="text-zinc-600 dark:text-slate-50"
            size={28}
          />
          <Text className="text-xs">
            Esse post ainda não contém comentários. Seja o primeio a comentar!
          </Text>
        </div>
      )}
    </div>
  )
}

interface PreviewPostCommentsProps {
  comments: PostCommentDTO[]
}

const PreviewPostComments = ({ comments }: PreviewPostCommentsProps) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-center px-2 py-2">
      {comments.length ? (
        comments.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))
      ) : (
        <div className="flex flex-col w-full px-4 items-center justify-center gap-2">
          <MessagesSquare
            className="text-zinc-600 dark:text-slate-50"
            size={28}
          />
          <Text className="text-xs">
            Esse post ainda não contém comentários. Seja o primeio a comentar!
          </Text>
        </div>
      )}
    </div>
  )
}

interface CommentCardProps {
  comment: PostCommentDTO
}

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <div className="w-full h-fit px-2 py-1 flex flex-row items-center justify-between">
      <div className="w-full h-full">
        <div className="flex flex-row gap-2 py-1 w-full items-center justify-center">
          <div className="w-7 h-6">
            <UserAvatar
              exibitionName={comment.user?.username || ''}
              userImage={comment.user?.profilePicture || ''}
              height={6}
              width={6}
            />
          </div>
          <Text className="text-xs text-start text-zinc-500 dark:text-zinc-300">
            @{comment.user?.username}
          </Text>
        </div>
        <Text className="text-start text-xs pl-1">{comment.content}</Text>
      </div>
      <div className="flex flex-row justify-center items-center gap-1 px-2">
        <div className="flex flex-row items-center justify-center -gap-1">
          <Button className="text-zinc-600 dark:text-slate-50 flex items-center h-6 w-6 bg-transparent cursor-pointer px-1 dark:hover:bg-dark-slate-gray-400 hover:bg-slate-200">
            <ThumbsUp
            // fill="#1DAABB" stroke="#1DAABB"
            />
          </Button>
          <Text className="text-xs mt-0.5 h-full flex items-center">{5}</Text>
        </div>
        <div className="flex flex-row items-center justify-center -gap-1 h-full">
          <Button className="text-zinc-600 dark:text-slate-50 flex items-center h-6 w-6 bg-transparent cursor-pointer px-1 dark:hover:bg-dark-slate-gray-400 hover:bg-slate-200">
            <ThumbsDown
            // fill="#f60000" stroke="#f60000"
            />
          </Button>
          <Text className="text-xs">{20}</Text>
        </div>
      </div>
    </div>
  )
}

export { PostComments }
