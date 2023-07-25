import { CreateActivateTokenDTO } from '../dtos/activate-token/create-activate-token.dto'
import { UpdateActivateTokenDTO } from '../dtos/activate-token/update-activate-token.dto'
import { ActivateToken } from '../entities/activate-token.entity'

interface IActivateTokenRepository {
  create: (activateToken: CreateActivateTokenDTO) => Promise<ActivateToken>
  getById: (id: string) => Promise<ActivateToken | undefined>
  getByToken: (token: string) => Promise<ActivateToken | undefined>
  update: (
    id: string,
    activateToken: UpdateActivateTokenDTO,
  ) => Promise<ActivateToken>
  delete: (id: string) => Promise<void>
}

export { IActivateTokenRepository }
