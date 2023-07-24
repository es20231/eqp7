import { IImageRepository } from '../repositories/iimage.repository'
import { IPostRepository } from '../repositories/ipost.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { AuthService } from '../services/auth.service'

const instantiatedAuthService = (
  userRepository: IUserRepository,
  imageRepository: IImageRepository,
  postRepository: IPostRepository,
) =>
  AuthService({
    userServiceProps: {
      imageRepository,
      userRepository,
      postRepository,
    },
  })

export { instantiatedAuthService }
