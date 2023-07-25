import { ActivateToken } from '../../../entities/activate-token.entity'
import { delay, generateRandomId } from '../../../utils'
import { IActivateTokenRepository } from '../../iactivate-token.repository'

const activateTokens: ActivateToken[] = []

const MemoryActivateTokenRepository: IActivateTokenRepository = {
  create: async (activateToken) => {
    const existingActivateToken = activateTokens.find(
      (token) => activateToken.token === token.token,
    )

    if (existingActivateToken) throw new Error('Activate token already exists')

    const newActivateToken = {
      id: generateRandomId(),
      ...activateToken,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    activateTokens.push(newActivateToken)

    return newActivateToken
  },
  getById: async (id) => {
    const activateToken = activateTokens.find((token) => token.id === id)

    return activateToken
  },
  getByToken: async (token) => {
    const activateToken = activateTokens.find(
      (activateToken) => activateToken.token === token,
    )

    return activateToken
  },
  update: async (id, activateToken) => {
    const existingActivateToken = activateTokens.find(
      (token) => token.id === id,
    )

    if (!existingActivateToken) throw new Error('Activate token does not exist')

    const updatedActivateToken = {
      ...existingActivateToken,
      ...activateToken,
      updatedAt: new Date(),
    }

    activateTokens.splice(
      activateTokens.findIndex((token) => token.id === id),
      1,
      updatedActivateToken,
    )

    return updatedActivateToken
  },
  delete: async (id) => {
    const activateTokenIndex = activateTokens.findIndex(
      (token) => token.id === id,
    )

    if (activateTokenIndex === -1)
      throw new Error('Activate token does not exist')

    activateTokens.splice(activateTokenIndex, 1)
  },
}

const clearMemoryActivateToken = async () => {
  await delay()
  activateTokens.splice(0, activateTokens.length)
}

export { MemoryActivateTokenRepository, clearMemoryActivateToken }
