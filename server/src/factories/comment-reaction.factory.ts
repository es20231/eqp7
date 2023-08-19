import { ICommentReactionRepository } from '../repositories/icomment-reaction.repository'
import { ICommentRepository } from '../repositories/icomment.repository'
import { IPostRepository } from '../repositories/ipost.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import {
  CommentReactionService,
  ICommentReactionService,
} from '../services/comment-reaction.service'

const instantiatedCommentReactionService = (
  commentReactionRepository: ICommentReactionRepository,
  userRepository: IUserRepository,
  postRepository: IPostRepository,
  commentRepository: ICommentRepository,
): ICommentReactionService =>
  CommentReactionService(
    commentReactionRepository,
    userRepository,
    postRepository,
    commentRepository,
  )

export { instantiatedCommentReactionService }
