import { CommentReaction } from './comment-reaction.entity'

interface Comment {
  id: string
  content: string
  userId: string
  postId: string

  commentReactions?: CommentReaction[]
}

export { Comment }
