import { Comment } from './comment.entity'

interface Post {
  id: string
  subtitle: string
  userId: string
  imageId: string

  // FIXME: change any to the correct type
  comments?: Comment[]
  reactions?: any[]
}

export { Post }
