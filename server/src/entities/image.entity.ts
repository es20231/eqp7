import { Post } from './post.entity'

interface Image {
  id: string
  url: string
  userId: string
  deleted: boolean

  posts?: Post[]
}

export { Image }
