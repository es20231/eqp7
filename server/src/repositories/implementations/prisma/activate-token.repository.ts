import { prisma } from '../../../lib/prisma'
import { IActivateTokenRepository } from '../../iactivate-token.repository'

const PrismaActivateTokenRepository: IActivateTokenRepository = {
  create: async (activateToken) => {
    const token = await prisma.activateToken.create({
      data: activateToken,
    })

    return { ...token, activatedAt: token.activatedAt || undefined }
  },
  getById: async (id) => {
    const activateToken = await prisma.activateToken.findUnique({
      where: { id },
    })

    return activateToken
      ? {
          ...activateToken,
          activatedAt: activateToken.activatedAt || undefined,
        }
      : undefined
  },
  getByToken: async (token) => {
    const activateToken = await prisma.activateToken.findUnique({
      where: { token },
    })

    return activateToken
      ? {
          ...activateToken,
          activatedAt: activateToken.activatedAt || undefined,
        }
      : undefined
  },
  update: async (id, activateToken) => {
    const updatedActivateToken = await prisma.activateToken.update({
      where: { id },
      data: activateToken,
    })

    return {
      ...updatedActivateToken,
      activatedAt: updatedActivateToken.activatedAt || undefined,
    }
  },
  delete: async (id) => {
    await prisma.activateToken.delete({ where: { id } })
  },
}

const clearPrismaActivateToken = async () => {
  await prisma.activateToken.deleteMany()
}

export { PrismaActivateTokenRepository, clearPrismaActivateToken }
