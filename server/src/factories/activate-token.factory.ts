import { IActivateTokenRepository } from '../repositories/iactivate-token.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { ActivateTokenService } from '../services/activate-token.service'

const instantiatedActivateTokenService = (
  activateTokenRepository: IActivateTokenRepository,
  userRepository: IUserRepository,
) => ActivateTokenService(activateTokenRepository, userRepository)

export { instantiatedActivateTokenService }
