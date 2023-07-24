import { IImageRepository } from '../repositories/iimage.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { AuthService } from '../services/auth.service'

const instantiatedAuthService = (
  userRepository: IUserRepository,
  imageRepository: IImageRepository,
) =>
  AuthService({
    userServiceProps: {
      imageRepository,
      userRepository,
    },
  })

export { instantiatedAuthService }
