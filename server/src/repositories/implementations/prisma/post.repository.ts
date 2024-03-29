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
    return post
      ? {
          ...post,
          filter: post.filter || undefined,
        }
      : undefined
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
            profilePicture: true,
            fullName: true,
          },
        },
      },
    })
    return posts.map((post) => ({
      ...post,
      filter: post.filter || undefined,
    }))
  },
  getPosts: async (take?: number, skip?: number) => {
    const posts = await prisma.post.findMany({
      take,
      skip,
    })
    return posts.map((post) => ({
      ...post,
      filter: post.filter || undefined,
    }))
  },
  createPost: async (post: CreatePostDTO) => {
    const createdPost = await prisma.post.create({
      data: {
        subtitle: post.subtitle,
        userId: post.userId,
        imageId: post.imageId,
        filter: post.filter,
      },
    })
    return { ...createdPost, filter: createdPost.filter || undefined }
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
    return { ...updatedPost, filter: updatedPost.filter || undefined }
  },
  deletePost: async (id: string) => {
    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },
      include: {
        image: {
          select: {
            deleted: true,
          },
        },
      },
    })

    const {
      image: { deleted },
    } = deletedPost

    if (!deleted)
      return { ...deletedPost, filter: deletedPost.filter || undefined }

    const postsWithSameImage = await prisma.post.findMany({
      where: {
        imageId: deletedPost.imageId,
      },
    })

    if (postsWithSameImage.length === 0) {
      await prisma.image.delete({
        where: {
          id: deletedPost.imageId,
          deleted: true,
        },
      })
    }

    return { ...deletedPost, filter: deletedPost.filter || undefined }
  },
}

const clearPostsPrisma = async () => {
  await prisma.post.deleteMany()
}

export { PrismaPostRepository, clearPostsPrisma }
