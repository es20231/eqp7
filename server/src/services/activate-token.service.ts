import { CreateActivateTokenDTO } from '../dtos/activate-token/create-activate-token.dto'
import { UpdateActivateTokenDTO } from '../dtos/activate-token/update-activate-token.dto'
import { IActivateTokenRepository } from '../repositories/iactivate-token.repository'
import { IUserRepository } from '../repositories/iuser.repository'

const ActivateTokenService = (
  activateTokenRepository: IActivateTokenRepository,
  userRepository: IUserRepository,
) => ({
  create: async (activateToken: CreateActivateTokenDTO) => {
    const userExists = await userRepository.getUserById(activateToken.userId)

    if (!userExists) {
      return {
        ok: false,
        message: `User #${activateToken.userId} not found`,
        payload: undefined,
      }
    }

    const existingActivateToken = await activateTokenRepository.getByToken(
      activateToken.token,
    )

    if (existingActivateToken) {
      return {
        ok: false,
        message: 'Activate token already exists',
        payload: undefined,
      }
    }

    const newActivateToken = await activateTokenRepository.create(activateToken)

    return {
      ok: true,
      message: 'Activate token created successfully',
      payload: newActivateToken,
    }
  },
  getById: async (id: string) => {
    const activateToken = await activateTokenRepository.getById(id)

    if (!activateToken) {
      return {
        ok: false,
        message: 'Activate token not found',
        payload: undefined,
      }
    }

    if (!activateToken.activatedAt) {
      const isExpired =
        new Date().getTime() - activateToken.createdAt.getTime() >
        1000 * 60 * 60 * 24

      if (isExpired) {
        await activateTokenRepository.delete(id)

        return {
          ok: false,
          message: 'Activate token expired',
          payload: undefined,
        }
      }
    }

    return {
      ok: true,
      message: 'Activate token found successfully',
      payload: activateToken,
    }
  },
  getByToken: async (token: string) => {
    const activateToken = await activateTokenRepository.getByToken(token)

    if (!activateToken) {
      return {
        ok: false,
        message: 'Activate token not found',
        payload: undefined,
      }
    }

    if (!activateToken.activatedAt) {
      const isExpired =
        new Date().getTime() - activateToken.createdAt.getTime() >
        1000 * 60 * 60 * 24

      if (isExpired) {
        await activateTokenRepository.delete(activateToken.id)

        return {
          ok: false,
          message: 'Activate token expired',
          payload: undefined,
        }
      }
    }

    return {
      ok: true,
      message: 'Activate token found successfully',
      payload: activateToken,
    }
  },
  update: async (id: string, activateToken: UpdateActivateTokenDTO) => {
    if (activateToken.userId) {
      const userExists = await userRepository.getUserById(activateToken.userId)

      if (!userExists) {
        return {
          ok: false,
          message: `User #${activateToken.userId} not found`,
          payload: undefined,
        }
      }
    }

    const existingActivateToken = await activateTokenRepository.getById(id)

    if (!existingActivateToken) {
      return {
        ok: false,
        message: 'Activate token not found',
        payload: undefined,
      }
    }

    if (activateToken.token) {
      const existingActivateTokenByToken =
        await activateTokenRepository.getByToken(activateToken.token)

      if (
        existingActivateTokenByToken &&
        existingActivateTokenByToken.id !== id
      ) {
        return {
          ok: false,
          message: 'Activate token already exists',
          payload: undefined,
        }
      }
    }

    const updatedActivateToken = await activateTokenRepository.update(
      id,
      activateToken,
    )

    return {
      ok: true,
      message: 'Activate token updated successfully',
      payload: updatedActivateToken,
    }
  },
  delete: async (id: string) => {
    const existingActivateToken = await activateTokenRepository.getById(id)

    if (!existingActivateToken) {
      return {
        ok: false,
        message: 'Activate token not found',
        payload: undefined,
      }
    }

    await activateTokenRepository.delete(id)

    return {
      ok: true,
      message: 'Activate token deleted successfully',
      payload: undefined,
    }
  },
})

export { ActivateTokenService }
