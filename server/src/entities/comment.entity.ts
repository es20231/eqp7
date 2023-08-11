interface Comment {
  id: string
  content: string
  userId: string
  postId: string

  commentReactions?: any[]
}

export { Comment }
