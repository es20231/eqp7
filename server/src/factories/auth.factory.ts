import { IActivateTokenRepository } from '../repositories/iactivate-token.repository'
import { IImageRepository } from '../repositories/iimage.repository'
import { IPostRepository } from '../repositories/ipost.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { AuthService } from '../services/auth.service'
import { IMailService } from '../services/outsourced/IMailService'

const instantiatedAuthService = (
  activateTokenRepository: IActivateTokenRepository,
  mailService: IMailService,
  userRepository: IUserRepository,
  imageRepository: IImageRepository,
  postRepository: IPostRepository,
) =>
  AuthService({
    activateTokenServiceProps: {
      activateTokenRepository,
    },
    mailServiceProps: {
      mailService,
    },
    userServiceProps: {
      imageRepository,
      userRepository,
      postRepository,
    },
  })

export { instantiatedAuthService }
