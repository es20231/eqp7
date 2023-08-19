import { CreatePostReactionDTO } from '../../../dtos/post-reaction/create-post-reaction.dto'
import { prisma } from '../../../lib/prisma'
import { IPostReactionRepository } from '../../ipost-reaction.repository'

const PrismaPostReactionRepository: IPostReactionRepository = {
  getPostReactionById: async (id: string) => {
    const postReaction = await prisma.postReaction.findUnique({
      where: {
        id,
      },
    })
    return postReaction || undefined
  },
  getPostReactions: async (type?: string, take?: number, skip?: number) => {
    const postReactions = await prisma.postReaction.findMany({
      where: {
        type,
      },
      take,
      skip,
    })
    return postReactions
  },
  getPostReactionsByUserId: async (
    userId: string,
    type?: string,
    take?: number,
    skip?: number,
  ) => {
    const postReactions = await prisma.postReaction.findMany({
      where: {
        userId,
        type,
      },
      take,
      skip,
    })
    return postReactions
  },
  getPostReactionsByPostId: async (
    postId: string,
    type?: string,
    take?: number,
    skip?: number,
  ) => {
    const postReactions = await prisma.postReaction.findMany({
      where: {
        postId,
        type,
      },
      include: {
        user: {
          select: {
            username: true,
            profilePicture: true,
          },
        },
      },
      take,
      skip,
    })
    return postReactions
  },
  createPostReaction: async (postReaction: CreatePostReactionDTO) => {
    const createdPostReaction = await prisma.postReaction.create({
      data: {
        type: postReaction.type,
        userId: postReaction.userId,
        postId: postReaction.postId,
      },
    })
    return createdPostReaction
  },
  deletePostReaction: async (id: string) => {
    const deletedPostReaction = await prisma.postReaction.delete({
      where: {
        id,
      },
    })
    return deletedPostReaction
  },
}

const clearPostReactionsPrisma = async () => {
  await prisma.postReaction.deleteMany()
}

export { PrismaPostReactionRepository, clearPostReactionsPrisma }
