import { hash } from 'bcrypt'
import { CreateUserDTO } from '../../../dtos/user/create-user.dto'
import { UpdateUserDTO } from '../../../dtos/user/update-user.dto'
import { User } from '../../../entities/user.entity'
import { delay, generateRandomId } from '../../../utils'
import { IUserRepository } from '../../iuser.repository'

const users = [] as User[]

const MemoryUserRepository: IUserRepository = {
  getUserById: async (id: string) => {
    await delay()

    const user = users.find((user) => user.id === id)

    if (!user) return undefined

    return {
      ...user,
      password: undefined,
      biography: user.biography || undefined,
      profilePicture: user.profilePicture || undefined,
    }
  },
  getUserByUsername: async (username: string) => {
    await delay()
    const user = users.find((user) => user.username === username)

    if (!user) return undefined

    return {
      ...user,
      password: undefined,
      biography: user.biography || undefined,
      profilePicture: user.profilePicture || undefined,
    }
  },
  getUserByEmail: async (email: string) => {
    await delay()
    const user = users.find((user) => user.email === email)

    if (!user) return undefined

    return {
      ...user,
      password: undefined,
      biography: user.biography || undefined,
      profilePicture: user.profilePicture || undefined,
    }
  },
  getUsers: async () => {
    await delay()
    return users.map((user) => ({
      ...user,
      password: undefined,
      biography: user.biography || undefined,
      profilePicture: user.profilePicture || undefined,
    }))
  },
  createUser: async (user: CreateUserDTO) => {
    await delay()

    const { username, email } = user

    const usernameAlreadyExists = users.some(
      (user) => user.username === username,
    )

    const emailAlreadyExists = users.some((user) => user.email === email)

    if (usernameAlreadyExists)
      throw new Error('Unique constraint error. Username already exists')

    if (emailAlreadyExists)
      throw new Error('Unique constraint error. Email already exists')

    const newUser = {
      ...user,
      id: generateRandomId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      password: await hash(user.password, 10),
      emailVerified: false,
    } as User

    users.push(newUser)

    return {
      ...newUser,
      password: undefined,
      biography: newUser.biography || undefined,
      profilePicture: newUser.profilePicture || undefined,
    }
  },
  updateUser: async (id: string, user: UpdateUserDTO) => {
    await delay()

    const { username, email } = user

    const usernameAlreadyExists = users.some(
      (user) => user.username === username && user.id !== id,
    )

    const emailAlreadyExists = users.some(
      (user) => user.email === email && user.id !== id,
    )

    if (usernameAlreadyExists)
      throw new Error('Unique constraint error. Username already exists')

    if (emailAlreadyExists)
      throw new Error('Unique constraint error. Email already exists')

    const userIndex = users.findIndex((user) => user.id === id)

    if (userIndex === -1) throw new Error('User does not exists')

    const updatedUser = {
      ...users[userIndex],
      ...user,
      updatedAt: new Date(),
    }

    users[userIndex] = updatedUser

    return {
      ...updatedUser,
      password: undefined,
      biography: updatedUser.biography || undefined,
      profilePicture: updatedUser.profilePicture || undefined,
    }
  },
  deleteUser: async (id: string) => {
    await delay()

    const userIndex = users.findIndex((user) => user.id === id)

    if (userIndex === -1) throw new Error('User does not exists')

    const deletedUser = users[userIndex]

    users.splice(userIndex, 1)

    return {
      ...deletedUser,
      password: undefined,
      biography: deletedUser.biography || undefined,
      profilePicture: deletedUser.profilePicture || undefined,
    }
  },
}

const clearUserMemory = async () => {
  await delay()
  users.splice(0, users.length)
}

export { MemoryUserRepository, clearUserMemory }
