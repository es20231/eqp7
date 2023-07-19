import { IImageRepository } from '../repositories/iimage.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { IImageService, ImageService } from '../services/image.service'

const instantiatedImageService = (
  imageRepo: IImageRepository,
  userRepo: IUserRepository,
): IImageService => ImageService(imageRepo, userRepo)

export { instantiatedImageService }
