import { CreateCommentReactionDTO } from '../dtos/comment-reaction/create-comment-reaction.dto'
import { CommentReaction } from '../entities/comment-reaction.entity'
import { ICommentReactionRepository } from '../repositories/icomment-reaction.repository'
import { ICommentRepository } from '../repositories/icomment.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { ServiceResult } from './result'

interface ICommentReactionService {
  getCommentReactions(
    type?: 'like' | 'dislike',
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<CommentReaction[]>>
  getCommentReactionById(id: string): Promise<ServiceResult<CommentReaction>>
  getCommentReactionsByCommentId(
    commentId: string,
    type?: 'like' | 'dislike',
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<CommentReaction[]>>
  getCommentReactionsByUserId(
    userId: string,
    type?: 'like' | 'dislike',
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<CommentReaction[]>>
  createCommentReaction(
    commentReaction: CreateCommentReactionDTO,
  ): Promise<ServiceResult<CommentReaction>>
  deleteCommentReaction(id: string): Promise<ServiceResult<void>>
}

const CommentReactionService = (
  commentReactionRepository: ICommentReactionRepository,
  userRepository: IUserRepository,
  commentRepository: ICommentRepository,
): ICommentReactionService => ({
  getCommentReactions: async (
    type?: 'like' | 'dislike',
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<CommentReaction[]>> => {
    const commentReactions =
      await commentReactionRepository.getCommentReactions(type, take, skip)
    return {
      ok: true,
      message: 'CommentReactions found successfully',
      payload: commentReactions,
    }
  },
  getCommentReactionById: async (
    id: string,
  ): Promise<ServiceResult<CommentReaction>> => {
    const commentReaction =
      await commentReactionRepository.getCommentReactionById(id)
    if (!commentReaction) {
      return {
        ok: false,
        message: `CommentReaction #${id} not found`,
        payload: undefined,
      }
    }
    return {
      ok: true,
      message: 'CommentReaction found successfully',
      payload: commentReaction,
    }
  },
  getCommentReactionsByCommentId: async (
    commentId: string,
    type?: 'like' | 'dislike',
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<CommentReaction[]>> => {
    const commentReactions =
      await commentReactionRepository.getCommentReactionsByCommentId(
        commentId,
        type,
        take,
        skip,
      )
    return {
      ok: true,
      message: 'CommentReactions found successfully',
      payload: commentReactions,
    }
  },
  getCommentReactionsByUserId: async (
    userId: string,
    type?: 'like' | 'dislike',
    take?: number,
    skip?: number,
  ): Promise<ServiceResult<CommentReaction[]>> => {
    const commentReactions =
      await commentReactionRepository.getCommentReactionsByUserId(
        userId,
        type,
        take,
        skip,
      )
    return {
      ok: true,
      message: 'CommentReactions found successfully',
      payload: commentReactions,
    }
  },
  createCommentReaction: async (
    commentReaction: CreateCommentReactionDTO,
  ): Promise<ServiceResult<CommentReaction>> => {
    const user = await userRepository.getUserById(commentReaction.userId)
    if (!user) {
      return {
        ok: false,
        message: `User #${commentReaction.userId} not found`,
        payload: undefined,
      }
    }
    const comment = await commentRepository.getCommentById(
      commentReaction.commentId,
    )
    if (!comment) {
      return {
        ok: false,
        message: `Comment #${commentReaction.commentId} not found`,
        payload: undefined,
      }
    }
    const createdCommentReaction =
      await commentReactionRepository.createCommentReaction(commentReaction)
    return {
      ok: true,
      message: 'CommentReaction created successfully',
      payload: createdCommentReaction,
    }
  },
  deleteCommentReaction: async (id: string): Promise<ServiceResult<void>> => {
    const commentReaction =
      await commentReactionRepository.getCommentReactionById(id)
    if (!commentReaction) {
      return {
        ok: false,
        message: `CommentReaction #${id} not found`,
        payload: undefined,
      }
    }
    await commentReactionRepository.deleteCommentReaction(id)
    return {
      ok: true,
      message: 'CommentReaction deleted successfully',
      payload: undefined,
    }
  },
})

export { ICommentReactionService, CommentReactionService }
