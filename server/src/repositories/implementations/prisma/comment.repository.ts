import { CreateCommentDTO } from '../../../dtos/comment/create-comment.dto'
import { prisma } from '../../../lib/prisma'
import { ICommentRepository } from '../../icomment.repository'

const PrismaCommentRepository: ICommentRepository = {
  getCommentById: async (id: string) => {
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    })
    return comment || undefined
  },
  getCommentsByUserId: async (userId: string) => {
    const comments = await prisma.comment.findMany({
      where: {
        userId,
      },
    })
    return comments
  },
  getCommentsByPostId: async (postId: string) => {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
    })
    return comments
  },
  getComments: async () => {
    const comments = await prisma.comment.findMany()
    return comments
  },
  createComment: async (comment: CreateCommentDTO) => {
    const createdComment = await prisma.comment.create({
      data: {
        content: comment.content,
        userId: comment.userId,
        postId: comment.postId,
      },
    })
    return createdComment
  },
  deleteComment: async (id: string) => {
    const deletedComment = await prisma.comment.delete({
      where: {
        id,
      },
    })
    return deletedComment
  },
}

const clearCommentsPrisma = async () => {
  await prisma.comment.deleteMany()
}

export { PrismaCommentRepository, clearCommentsPrisma }
