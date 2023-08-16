import { CommentReaction } from './comment-reaction.entity'
import { Comment } from './comment.entity'
import { Image } from './image.entity'
import { PostReaction } from './post-reaction.entity'
import { Post } from './post.entity'

interface User {
  id: string
  fullName: string
  username: string
  email: string
  emailVerified: boolean
  password: string
  biography?: string
  profilePicture?: string

  images?: Image[]
  posts?: Post[]
  comments?: Comment[]
  postReactions?: PostReaction[]
  commentReactions?: CommentReaction[]
}

export { User }
