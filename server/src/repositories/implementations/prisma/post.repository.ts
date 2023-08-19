import { CreatePostDTO } from '../../../dtos/post/create-post.dto'
import { UpdatePostDTO } from '../../../dtos/post/update-post.dto'
import { prisma } from '../../../lib/prisma'
import { IPostRepository } from '../../ipost.repository'

const PrismaPostRepository: IPostRepository = {
  getPostById: async (id: string) => {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    })
    return post || undefined
  },
  getPostsByUserId: async (userId: string, take?: number, skip?: number) => {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
      take,
      skip,
      include: {
        image: {
          select: {
            url: true,
          },
        },
        user: {
          select: {
            username: true,
          },
        },
      },
    })
    return posts
  },
  getPosts: async (take?: number, skip?: number) => {
    const posts = await prisma.post.findMany({
      take,
      skip,
    })
    return posts
  },
  createPost: async (post: CreatePostDTO) => {
    const createdPost = await prisma.post.create({
      data: {
        subtitle: post.subtitle,
        userId: post.userId,
        imageId: post.imageId,
      },
    })
    return createdPost
  },
  updatePost: async (id: string, post: UpdatePostDTO) => {
    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        ...post,
      },
    })
    return updatedPost
  },
  deletePost: async (id: string) => {
    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },
    })
    return deletedPost
  },
}

const clearPostsPrisma = async () => {
  await prisma.post.deleteMany()
}

export { PrismaPostRepository, clearPostsPrisma }
