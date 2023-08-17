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
  getCommentsByUserId: async (userId: string, take?: number, skip?: number) => {
    const comments = await prisma.comment.findMany({
      where: {
        userId,
      },
      take,
      skip,
    })
    return comments
  },
  getCommentsByPostId: async (postId: string, take?: number, skip?: number) => {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            profilePicture: true,
            username: true,
          },
        },
        commentReactions: {
          select: {
            user: {
              select: {
                profilePicture: true,
                username: true,
              },
            },
            type: true,
            createdAt: true,
            id: true,
            userId: true,
            commentId: true,
          },
        },
      },
      take,
      skip,
    })
    return comments
  },
  getComments: async (take?: number, skip?: number) => {
    const comments = await prisma.comment.findMany({
      take,
      skip,
    })
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
