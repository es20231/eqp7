import { IImageRepository } from '../repositories/iimage.repository'
import { IPostRepository } from '../repositories/ipost.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { IUserService, UserService } from '../services/user.service'

const instantiatedUserService = (
  userRepo: IUserRepository,
  imageRepo: IImageRepository,
  postRepo: IPostRepository,
): IUserService => UserService(userRepo, imageRepo, postRepo)

export { instantiatedUserService }
