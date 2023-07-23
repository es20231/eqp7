import { Post } from './post.entity'

interface Image {
  id: string
  url: string
  userId: string

  posts?: Post[]
}

export { Image }
