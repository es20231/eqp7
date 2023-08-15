import { IPostReactionRepository } from '../repositories/ipost-reaction.repository'
import { IPostRepository } from '../repositories/ipost.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import {
  IPostReactionService,
  PostReactionService,
} from '../services/post-reaction.service'

const instantiatedPostReactionService = (
  postReactionRepository: IPostReactionRepository,
  userRepository: IUserRepository,
  postRepository: IPostRepository,
): IPostReactionService =>
  PostReactionService(postReactionRepository, userRepository, postRepository)

export { instantiatedPostReactionService }
