import { CreateCommentDTO } from '../dtos/comment/create-comment.dto'
import { Comment } from '../entities/comment.entity'
import { ICommentRepository } from '../repositories/icomment.repository'
import { IPostRepository } from '../repositories/ipost.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { ServiceResult } from './result'

interface ICommentService {
  getComments(take: number, skip: number): Promise<ServiceResult<Comment[]>>
  getCommentById(id: string): Promise<ServiceResult<Comment>>
  getCommentsByPostId(
    postId: string,
    take: number,
    skip: number,
  ): Promise<ServiceResult<Comment[]>>
  getCommentsByUserId(
    userId: string,
    take: number,
    skip: number,
  ): Promise<ServiceResult<Comment[]>>
  createComment(comment: CreateCommentDTO): Promise<ServiceResult<Comment>>
  deleteComment(id: string): Promise<ServiceResult<void>>
}

const CommentService = (
  commentRepository: ICommentRepository,
  userRepository: IUserRepository,
  postRepository: IPostRepository,
): ICommentService => ({
  getComments: async (
    take: number,
    skip: number,
  ): Promise<ServiceResult<Comment[]>> => {
    const comments = await commentRepository.getComments(take, skip)
    return {
      ok: true,
      message: 'Comments found successfully',
      payload: comments,
    }
  },
  getCommentById: async (id: string): Promise<ServiceResult<Comment>> => {
    const comment = await commentRepository.getCommentById(id)
    if (!comment) {
      return {
        ok: false,
        message: `Comment #${id} not found`,
        payload: undefined,
      }
    }
    return {
      ok: true,
      message: 'Comment found successfully',
      payload: comment,
    }
  },
  getCommentsByPostId: async (
    postId: string,
    take: number,
    skip: number,
  ): Promise<ServiceResult<Comment[]>> => {
    const post = await postRepository.getPostById(postId)
    if (!post) {
      return {
        ok: false,
        message: `Post #${postId} not found`,
        payload: undefined,
      }
    }
    const comments = await commentRepository.getCommentsByPostId(
      postId,
      take,
      skip,
    )
    return {
      ok: true,
      message: 'Comments found successfully',
      payload: comments,
    }
  },
  getCommentsByUserId: async (
    userId: string,
    take: number,
    skip: number,
  ): Promise<ServiceResult<Comment[]>> => {
    const user = await userRepository.getUserById(userId)
    if (!user) {
      return {
        ok: false,
        message: `User #${userId} not found`,
        payload: undefined,
      }
    }
    const comments = await commentRepository.getCommentsByUserId(
      userId,
      take,
      skip,
    )
    return {
      ok: true,
      message: 'Comments found successfully',
      payload: comments,
    }
  },
  createComment: async (
    comment: CreateCommentDTO,
  ): Promise<ServiceResult<Comment>> => {
    const user = await userRepository.getUserById(comment.userId)
    if (!user) {
      return {
        ok: false,
        message: `User #${comment.userId} not found`,
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
    const newComment = await commentRepository.createComment(comment)
    return {
      ok: true,
      message: 'Comment created successfully',
      payload: newComment,
    }
  },
  deleteComment: async (id: string): Promise<ServiceResult<void>> => {
    const comment = await commentRepository.getCommentById(id)
    if (!comment) {
      return {
        ok: false,
        message: `Comment #${id} not found`,
        payload: undefined,
      }
    }
    await commentRepository.deleteComment(id)
    return {
      ok: true,
      message: 'Comment deleted successfully',
      payload: undefined,
    }
  },
})

export { ICommentService, CommentService }
