export type UserPostDTO = {
  id: string
  subtitle: string
  imageId: string
  userId: string
  createdAt: string
  updatedAt: string
  image: {
    url: string
  }
  user: {
    id: string
    username: string
    fullName: string
    profilePicture: string
  }
}
