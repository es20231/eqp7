import bcrypt from 'bcrypt'
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
      biography: user.biography || undefined,
      profilePicture: user.profilePicture || undefined,
    }
  },
  getUsers: async (take?: number, skip?: number) => {
    await delay()

    if (!take && skip)
      return users.slice(skip).map((user) => ({
        ...user,
        biography: user.biography || undefined,
        profilePicture: user.profilePicture || undefined,
      }))

    if (take && !skip)
      return users.slice(0, take).map((user) => ({
        ...user,
        biography: user.biography || undefined,
        profilePicture: user.profilePicture || undefined,
      }))
    if (take && skip)
      return users.slice(skip, skip + take).map((user) => ({
        ...user,
        biography: user.biography || undefined,
        profilePicture: user.profilePicture || undefined,
      }))
    return users.map((user) => ({
      ...user,
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
      password: await bcrypt.hash(user.password, 10),
      emailVerified: false,
    } as User

    users.push(newUser)

    return {
      ...newUser,
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
      password: user.password
        ? await bcrypt.hash(user.password, 10)
        : users[userIndex].password,
      updatedAt: new Date(),
    } as User

    users[userIndex] = updatedUser

    return {
      ...updatedUser,
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
