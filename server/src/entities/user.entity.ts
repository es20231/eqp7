import { Image } from './image.entity'

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
  posts?: any[]
  comments?: any[]
  postReactions?: any[]
  commentReactions?: any[]
}

export { User }
