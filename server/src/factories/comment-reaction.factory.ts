import { ICommentReactionRepository } from '../repositories/icomment-reaction.repository'
import { ICommentRepository } from '../repositories/icomment.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import {
  CommentReactionService,
  ICommentReactionService,
} from '../services/comment-reaction.service'

const instantiatedCommentReactionService = (
  commentReactionRepository: ICommentReactionRepository,
  userRepository: IUserRepository,
  commentRepository: ICommentRepository,
): ICommentReactionService =>
  CommentReactionService(
    commentReactionRepository,
    userRepository,
    commentRepository,
  )

export { instantiatedCommentReactionService }
