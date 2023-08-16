import { CreateCommentReactionDTO } from '../../../dtos/comment-reaction/create-comment-reaction.dto'
import { prisma } from '../../../lib/prisma'
import { ICommentReactionRepository } from '../../icomment-reaction.repository'

const PrismaCommentReactionRepository: ICommentReactionRepository = {
  getCommentReactionById: async (id: string) => {
    const commentReaction = await prisma.commentReaction.findUnique({
      where: {
        id,
      },
    })
    return commentReaction || undefined
  },
  getCommentReactions: async (type?: string, take?: number, skip?: number) => {
    const commentReactions = await prisma.commentReaction.findMany({
      where: {
        type,
      },
      take,
      skip,
    })
    return commentReactions
  },
  getCommentReactionsByUserId: async (
    userId: string,
    type?: string,
    take?: number,
    skip?: number,
  ) => {
    const commentReactions = await prisma.commentReaction.findMany({
      where: {
        userId,
        type,
      },
      take,
      skip,
    })
    return commentReactions
  },
  getCommentReactionsByCommentId: async (
    commentId: string,
    type?: string,
    take?: number,
    skip?: number,
  ) => {
    const commentReactions = await prisma.commentReaction.findMany({
      where: {
        commentId,
        type,
      },
      take,
      skip,
    })
    return commentReactions
  },
  createCommentReaction: async (commentReaction: CreateCommentReactionDTO) => {
    const createdCommentReaction = await prisma.commentReaction.create({
      data: {
        type: commentReaction.type,
        userId: commentReaction.userId,
        commentId: commentReaction.commentId,
      },
    })
    return createdCommentReaction
  },
  deleteCommentReaction: async (id: string) => {
    const deletedCommentReaction = await prisma.commentReaction.delete({
      where: {
        id,
      },
    })
    return deletedCommentReaction
  },
}

const clearCommentReactionsPrisma = async () => {
  await prisma.commentReaction.deleteMany()
}

export { PrismaCommentReactionRepository, clearCommentReactionsPrisma }
