import { IImageRepository } from '../repositories/iimage.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { ImageService } from '../services/image.service'
import { instantiatedUserService } from './user.factory'

const instantiatedImageService = (
  imageRepo: IImageRepository,
  userRepo: IUserRepository,
) => {
  const userService = instantiatedUserService(userRepo)
  return ImageService(imageRepo, userService)
}

export { instantiatedImageService }
