import { CreateCommentReactionDTO } from '../dtos/comment-reaction/create-comment-reaction.dto'
import { CommentReaction } from '../entities/comment-reaction.entity'
import { ICommentReactionRepository } from '../repositories/icomment-reaction.repository'
import { ICommentRepository } from '../repositories/icomment.repository'
import { IPostRepository } from '../repositories/ipost.repository'
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
  deleteCommentReaction(
    id: string,
    userId?: string,
  ): Promise<ServiceResult<void>>
}

const CommentReactionService = (
  commentReactionRepository: ICommentReactionRepository,
  userRepository: IUserRepository,
  postRepository: IPostRepository,
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
      message: 'Comment reactions found successfully',
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
        message: `Comment reaction #${id} not found`,
        payload: undefined,
      }
    }
    return {
      ok: true,
      message: 'Comment reaction found successfully',
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
      message: 'Comment reactions found successfully',
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
      message: 'Comment reactions found successfully',
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

    const commentReactionsUser =
      await commentReactionRepository.getCommentReactionsByUserId(
        commentReaction.userId,
      )

    if (commentReactionsUser.length > 0) {
      const commentReactionAlreadyExists = commentReactionsUser.find(
        (commentReactionUser) =>
          commentReactionUser.commentId === commentReaction.commentId,
      )
      if (commentReactionAlreadyExists) {
        return {
          ok: false,
          message: 'Comment reaction of user already exists for this comment',
          payload: undefined,
        }
      }
    }

    const createdCommentReaction =
      await commentReactionRepository.createCommentReaction(commentReaction)
    return {
      ok: true,
      message: 'Comment reaction created successfully',
      payload: createdCommentReaction,
    }
  },
  deleteCommentReaction: async (
    id: string,
    userId?: string,
  ): Promise<ServiceResult<void>> => {
    const commentReaction =
      await commentReactionRepository.getCommentReactionById(id)
    if (!commentReaction) {
      return {
        ok: false,
        message: `Comment reaction #${id} not found`,
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

    const post = await postRepository.getPostById(comment.postId)
    if (!post) {
      return {
        ok: false,
        message: `Post #${comment.postId} not found`,
        payload: undefined,
      }
    }

    if (post.userId !== userId) {
      return {
        ok: false,
        message: 'Invalid user id',
        payload: undefined,
      }
    }

    await commentReactionRepository.deleteCommentReaction(id)
    return {
      ok: true,
      message: 'Comment reaction deleted successfully',
      payload: undefined,
    }
  },
})

export { ICommentReactionService, CommentReactionService }
