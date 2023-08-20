import { Comment } from './comment.entity'
import { PostReaction } from './post-reaction.entity'

interface Post {
  id: string
  subtitle: string
  userId: string
  imageId: string
  filter?: string

  comments?: Comment[]
  reactions?: PostReaction[]
}

export { Post }
