import { CreateCommentDTO } from '../../../dtos/comment/create-comment.dto'
import { Comment } from '../../../entities/comment.entity'
import { delay, generateRandomId } from '../../../utils'
import { ICommentRepository } from '../../icomment.repository'

const comments = [] as Comment[]
const MemoryCommentRepository: ICommentRepository = {
  getCommentById: async (id: string) => {
    await delay()
    const comment = comments.find((comment) => comment.id === id)

    return comment || undefined
  },
  getComments: async (take: number, skip: number) => {
    await delay()
    const commentsToReturn = comments.slice(skip, skip + take)
    return commentsToReturn
  },
  getCommentsByUserId: async (userId: string, take: number, skip: number) => {
    await delay()
    const userComments = comments.filter((comment) => comment.userId === userId)
    const commentsToReturn = userComments.slice(skip, skip + take)
    return commentsToReturn
  },
  getCommentsByPostId: async (postId: string, take: number, skip: number) => {
    await delay()
    const postComments = comments.filter((comment) => comment.postId === postId)
    const commentsToReturn = postComments.slice(skip, skip + take)
    return commentsToReturn
  },
  createComment: async (comment: CreateCommentDTO) => {
    await delay()
    const createdComment = {
      ...comment,
      id: generateRandomId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Comment
    comments.push(createdComment)
    return createdComment
  },
  deleteComment: async (id: string) => {
    await delay()
    const commentIndex = comments.findIndex((comment) => comment.id === id)
    if (commentIndex < 0) throw new Error('Comment not found')
    const deletedComment = comments.splice(commentIndex, 1)[0]
    return deletedComment
  },
}

const clearCommentMemory = async () => {
  await delay()
  comments.splice(0, comments.length)
}

export { MemoryCommentRepository, clearCommentMemory }
