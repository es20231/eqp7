type CreatePostReactionDTO = {
  userId: string
  postId: string
  type: 'like' | 'dislike'
}

export { CreatePostReactionDTO }
