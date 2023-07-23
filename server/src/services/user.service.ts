import { CreateUserDTO } from '../dtos/user/create-user.dto'
import { UpdateUserDTO } from '../dtos/user/update-user.dto'
import { Image } from '../entities/image.entity'
import { User } from '../entities/user.entity'
import { IImageRepository } from '../repositories/iimage.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { ServiceResult } from './result'

interface IUserService {
  getUsers: () => Promise<ServiceResult<Omit<User, 'password'>[]>>
  getUserById: (id: string) => Promise<ServiceResult<Omit<User, 'password'>>>
  getUserByUsername: (
    username: string,
  ) => Promise<ServiceResult<Omit<User, 'password'>>>
  getUserByEmail: (
    email: string,
  ) => Promise<ServiceResult<Omit<User, 'password'>>>
  createUser: (
    user: CreateUserDTO,
  ) => Promise<ServiceResult<Omit<User, 'password'>>>
  updateUser: (
    id: string,
    user: UpdateUserDTO,
  ) => Promise<ServiceResult<Omit<User, 'password'>>>
  deleteUser: (id: string) => Promise<ServiceResult<Omit<User, 'password'>>>
  getUserImages: (id: string) => Promise<ServiceResult<Image[]>>
  // FIXME: change any to Post entity
  getUserPosts: (id: string) => Promise<ServiceResult<any[]>>
}

const UserService = (
  userRepository: IUserRepository,
  imageRepository: IImageRepository,
  // Add post service as dependency
): IUserService => ({
  getUsers: async () => {
    const users = await userRepository.getUsers()

    return {
      ok: true,
      message: 'Users found successfully',
      payload: users.map((user) => ({
        ...user,
        password: undefined,
      })),
    }
  },

  getUserById: async (id: string) => {
    const user = await userRepository.getUserById(id)

    if (!user) {
      return {
        ok: false,
        message: `User #${id} not found`,
        payload: undefined,
      }
    }

    return {
      ok: true,
      message: 'User found successfully',
      payload: {
        ...user,
        password: undefined,
      },
    }
  },

  getUserByUsername: async (username: string) => {
    const user = await userRepository.getUserByUsername(username)

    if (!user) {
      return {
        ok: false,
        message: `Username: ${username} not found`,
        payload: undefined,
      }
    }

    return {
      ok: true,
      message: 'User found successfully',
      payload: {
        ...user,
        password: undefined,
      },
    }
  },

  getUserByEmail: async (email: string) => {
    const user = await userRepository.getUserByEmail(email)

    if (!user) {
      return {
        ok: false,
        message: `User with email: ${email} not found`,
        payload: undefined,
      }
    }

    return {
      ok: true,
      message: 'User found successfully',
      payload: {
        ...user,
        password: undefined,
      },
    }
  },

  createUser: async (user: CreateUserDTO) => {
    const { username, email } = user

    const usernameExists = await userRepository.getUserByUsername(username)

    if (usernameExists) {
      return {
        ok: false,
        message: `Username: ${username} already exists`,
        payload: undefined,
      }
    }

    const emailExists = await userRepository.getUserByEmail(email)

    if (emailExists) {
      return {
        ok: false,
        message: `Email: ${email} already exists`,
        payload: undefined,
      }
    }

    const created = await userRepository.createUser(user)

    return {
      ok: true,
      message: 'User created successfully',
      payload: {
        ...created,
        password: undefined,
      },
    }
  },

  updateUser: async (id: string, user: UpdateUserDTO) => {
    const { username, email } = user

    const userExists = await userRepository.getUserById(id)

    if (!userExists) {
      return {
        ok: false,
        message: `User #${id} not found`,
        payload: undefined,
      }
    }

    if (username) {
      const usernameExists = await userRepository.getUserByUsername(username)

      if (usernameExists && usernameExists.id !== id) {
        return {
          ok: false,
          message: `Username: ${username} already exists`,
          payload: undefined,
        }
      }
    }

    if (email) {
      const emailExists = await userRepository.getUserByEmail(email)

      if (emailExists && emailExists.id !== id) {
        return {
          ok: false,
          message: `Email: ${email} already exists`,
          payload: undefined,
        }
      }
    }

    const updated = await userRepository.updateUser(id, user)

    return {
      ok: true,
      message: 'User updated successfully',
      payload: {
        ...updated,
        password: undefined,
      },
    }
  },

  deleteUser: async (id: string) => {
    const user = await userRepository.getUserById(id)

    if (!user) {
      return {
        ok: false,
        message: `User #${id} not found`,
        payload: undefined,
      }
    }

    await userRepository.deleteUser(id)

    return {
      ok: true,
      message: 'User deleted successfully',
      payload: undefined,
    }
  },

  getUserImages: async (id: string) => {
    const user = await userRepository.getUserById(id)

    if (!user) {
      return {
        ok: false,
        message: `User #${id} not found`,
        payload: undefined,
      }
    }

    const images = await imageRepository.getUserImages(id)

    return {
      ok: true,
      message: 'Images found successfully',
      payload: images,
    }
  },

  // TODO
  getUserPosts: async (id: string) => {
    const user = await userRepository.getUserById(id)

    if (!user) {
      return {
        ok: false,
        message: `User #${id} not found`,
        payload: undefined,
      }
    }

    // FIXME: use post service to get user posts

    return {
      ok: true,
      message: 'Posts found successfully',
      payload: [],
    }
  },
})

export { IUserService, UserService }
