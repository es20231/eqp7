import { CreatePostDTO } from '../dtos/post/create-post.dto'
import { UpdatePostDTO } from '../dtos/post/update-post.dto'
import { Post } from '../entities/post.entity'
import { IImageRepository } from '../repositories/iimage.repository'
import { IPostRepository } from '../repositories/ipost.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { ServiceResult } from './result'

interface IPostService {
  getPosts(take?: number, skip?: number): Promise<ServiceResult<Post[]>>
  getPostById(id: string): Promise<ServiceResult<Post>>
  getPostsByUserId(
    userId: string,
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<Post[]>>
  createPost(post: CreatePostDTO): Promise<ServiceResult<Post>>
  updatePost(id: string, post: UpdatePostDTO): Promise<ServiceResult<Post>>
  deletePost(id: string): Promise<ServiceResult<void>>
}

const PostService = (
  imageRepository: IImageRepository,
  postRepository: IPostRepository,
  userRepository: IUserRepository,
): IPostService => ({
  getPosts: async (
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<Post[]>> => {
    const posts = await postRepository.getPosts(take, skip)
    return {
      ok: true,
      message: 'Posts found successfully',
      payload: posts,
    }
  },
  getPostById: async (id: string): Promise<ServiceResult<Post>> => {
    const post = await postRepository.getPostById(id)
    if (!post) {
      return {
        ok: false,
        message: `Post #${id} not found`,
        payload: undefined,
      }
    }
    return {
      ok: true,
      message: 'Post found successfully',
      payload: post,
    }
  },
  getPostsByUserId: async (
    userId: string,
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<Post[]>> => {
    const user = await userRepository.getUserById(userId)
    if (!user) {
      return {
        ok: false,
        message: `User #${userId} not found`,
        payload: undefined,
      }
    }
    const posts = await postRepository.getPostsByUserId(userId, take, skip)
    return {
      ok: true,
      message: 'Posts found successfully',
      payload: posts,
    }
  },
  createPost: async (post: CreatePostDTO): Promise<ServiceResult<Post>> => {
    const user = await userRepository.getUserById(post.userId)
    if (!user) {
      return {
        ok: false,
        message: `User #${post.userId} not found`,
        payload: undefined,
      }
    }
    const image = await imageRepository.getImage(post.imageId)
    if (!image) {
      return {
        ok: false,
        message: `Image #${post.imageId} not found`,
        payload: undefined,
      }
    }
    const createdPost = await postRepository.createPost(post)
    return {
      ok: true,
      message: 'Post created successfully',
      payload: createdPost,
    }
  },
  updatePost: async (
    id: string,
    post: UpdatePostDTO,
  ): Promise<ServiceResult<Post>> => {
    const existingPost = await postRepository.getPostById(id)
    if (!existingPost) {
      return {
        ok: false,
        message: `Post #${id} not found`,
        payload: undefined,
      }
    }
    if (post.userId) {
      const existingUser = await userRepository.getUserById(post.userId)
      if (!existingUser) {
        return {
          ok: false,
          message: `User #${post.userId} not found`,
          payload: undefined,
        }
      }
    }
    if (post.imageId) {
      const existingImage = await imageRepository.getImage(post.imageId)
      if (!existingImage) {
        return {
          ok: false,
          message: `Image #${post.imageId} not found`,
          payload: undefined,
        }
      }
    }
    const updatedPost = await postRepository.updatePost(id, post)
    return {
      ok: true,
      message: 'Post updated successfully',
      payload: updatedPost,
    }
  },
  deletePost: async (id: string): Promise<ServiceResult<void>> => {
    const post = await postRepository.getPostById(id)
    if (!post) {
      return {
        ok: false,
        message: `Post #${id} not found`,
        payload: undefined,
      }
    }
    await postRepository.deletePost(id)
    return {
      ok: true,
      message: 'Post deleted successfully',
      payload: undefined,
    }
  },
})

export { IPostService, PostService }
