import { CreateUserDTO } from '../../../dtos/user/create-user.dto'
import { UpdateUserDTO } from '../../../dtos/user/update-user.dto'
import { prisma } from '../../../lib/prisma'
import { IUserRepository } from '../../iuser.repository'

const PrismaUserRepository: IUserRepository = {
  getUserById: async (id: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) return undefined

    return {
      ...user,
      biography: user.biography || undefined,
      profilePicture: user.profilePicture || undefined,
      password: undefined,
    }
  },
  getUserByUsername: async (username: string) => {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) return undefined

    return {
      ...user,
      biography: user.biography || undefined,
      profilePicture: user.profilePicture || undefined,
      password: undefined,
    }
  },
  getUserByEmail: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) return undefined

    return {
      ...user,
      biography: user.biography || undefined,
      profilePicture: user.profilePicture || undefined,
      password: undefined,
    }
  },
  getUsers: async () => {
    const users = await prisma.user.findMany()

    return users.map((user) => ({
      ...user,
      biography: user.biography || undefined,
      profilePicture: user.profilePicture || undefined,
      password: undefined,
    }))
  },
  createUser: async (user: CreateUserDTO) => {
    const createdUser = await prisma.user.create({
      data: user,
    })

    return {
      ...createdUser,
      biography: createdUser.biography || undefined,
      profilePicture: createdUser.profilePicture || undefined,
      password: undefined,
    }
  },
  updateUser: async (id: string, user: UpdateUserDTO) => {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: user,
    })

    return {
      ...updatedUser,
      biography: updatedUser.biography || undefined,
      profilePicture: updatedUser.profilePicture || undefined,
      password: undefined,
    }
  },
  deleteUser: async (id: string) => {
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    })

    return {
      ...deletedUser,
      biography: deletedUser.biography || undefined,
      profilePicture: deletedUser.profilePicture || undefined,
      password: undefined,
    }
  },
}

const clearUsersPrisma = async () => {
  await prisma.user.deleteMany()
}

export { PrismaUserRepository, clearUsersPrisma }
