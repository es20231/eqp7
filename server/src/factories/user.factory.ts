import { IImageRepository } from '../repositories/iimage.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { IUserService, UserService } from '../services/user.service'

const instantiatedUserService = (
  userRepo: IUserRepository,
  imageRepo: IImageRepository,
  // TODO: Add post repo as dependency
): IUserService => UserService(userRepo, imageRepo)

export { instantiatedUserService }
