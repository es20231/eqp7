import { CreatePostReactionDTO } from '../dtos/post-reaction/create-post-reaction.dto'
import { PostReaction } from '../entities/post-reaction.entity'
import { IPostReactionRepository } from '../repositories/ipost-reaction.repository'
import { IPostRepository } from '../repositories/ipost.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { ServiceResult } from './result'

interface IPostReactionService {
  getPostReactions(
    type?: 'like' | 'dislike',
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<PostReaction[]>>
  getPostReactionById(id: string): Promise<ServiceResult<PostReaction>>
  getPostReactionsByPostId(
    postId: string,
    type?: 'like' | 'dislike',
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<PostReaction[]>>
  getPostReactionsByUserId(
    userId: string,
    type?: 'like' | 'dislike',
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<PostReaction[]>>
  createPostReaction(
    postReaction: CreatePostReactionDTO,
  ): Promise<ServiceResult<PostReaction>>
  deletePostReaction(id: string): Promise<ServiceResult<void>>
}

const PostReactionService = (
  postReactionRepository: IPostReactionRepository,
  userRepository: IUserRepository,
  postRepository: IPostRepository,
): IPostReactionService => ({
  getPostReactions: async (
    type?: 'like' | 'dislike',
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<PostReaction[]>> => {
    const postReactions = await postReactionRepository.getPostReactions(
      type,
      take,
      skip,
    )
    return {
      ok: true,
      message: 'Post reactions found successfully',
      payload: postReactions,
    }
  },
  getPostReactionById: async (
    id: string,
  ): Promise<ServiceResult<PostReaction>> => {
    const postReaction = await postReactionRepository.getPostReactionById(id)
    if (!postReaction) {
      return {
        ok: false,
        message: `Post reaction #${id} not found`,
        payload: undefined,
      }
    }
    return {
      ok: true,
      message: 'Post reaction found successfully',
      payload: postReaction,
    }
  },
  getPostReactionsByPostId: async (
    postId: string,
    type?: 'like' | 'dislike',
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<PostReaction[]>> => {
    const postReactions = await postReactionRepository.getPostReactionsByPostId(
      postId,
      type,
      take,
      skip,
    )
    return {
      ok: true,
      message: 'Post reactions found successfully',
      payload: postReactions,
    }
  },
  getPostReactionsByUserId: async (
    userId: string,
    type?: 'like' | 'dislike',
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<PostReaction[]>> => {
    const postReactions = await postReactionRepository.getPostReactionsByUserId(
      userId,
      type,
      take,
      skip,
    )
    return {
      ok: true,
      message: 'Post reactions found successfully',
      payload: postReactions,
    }
  },
  createPostReaction: async (
    postReaction: CreatePostReactionDTO,
  ): Promise<ServiceResult<PostReaction>> => {
    const user = await userRepository.getUserById(postReaction.userId)
    if (!user) {
      return {
        ok: false,
        message: `User #${postReaction.userId} not found`,
        payload: undefined,
      }
    }
    const post = await postRepository.getPostById(postReaction.postId)
    if (!post) {
      return {
        ok: false,
        message: `Post #${postReaction.postId} not found`,
        payload: undefined,
      }
    }
    const newPostReaction = await postReactionRepository.createPostReaction(
      postReaction,
    )
    return {
      ok: true,
      message: 'Post reaction created successfully',
      payload: newPostReaction,
    }
  },
  deletePostReaction: async (id: string): Promise<ServiceResult<void>> => {
    const postReaction = await postReactionRepository.getPostReactionById(id)
    if (!postReaction) {
      return {
        ok: false,
        message: `Post reaction #${id} not found`,
        payload: undefined,
      }
    }
    await postReactionRepository.deletePostReaction(id)
    return {
      ok: true,
      message: 'Post reaction deleted successfully',
      payload: undefined,
    }
  },
})

export { IPostReactionService, PostReactionService }
