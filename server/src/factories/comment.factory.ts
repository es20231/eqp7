import { ICommentRepository } from '../repositories/icomment.repository'
import { IPostRepository } from '../repositories/ipost.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { CommentService, ICommentService } from '../services/comment.service'

const instantiatedCommentService = (
  commentRepository: ICommentRepository,
  userRepository: IUserRepository,
  postRepository: IPostRepository,
): ICommentService =>
  CommentService(commentRepository, userRepository, postRepository)

export { instantiatedCommentService }
