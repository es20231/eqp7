import { User } from '../../../entities/user.entity'
import { delay } from '../../../utils'
import { IUserRepository, UserWithoutPassword } from '../../iuser.repository'

const users = [] as User[]

const MemoryUserRepository: IUserRepository = {
  getUserById: async (id: string) => {
    await delay()
    return {} as UserWithoutPassword
  },
  getUserByUsername: async (username: string) => {
    await delay()
    return {} as UserWithoutPassword
  },
  getUserByEmail: async (email: string) => {
    await delay()
    return {} as UserWithoutPassword
  },
  getUsers: async () => {
    await delay()
    return [] as UserWithoutPassword[]
  },
  createUser: async (user: User) => {
    await delay()
    return {} as UserWithoutPassword
  },
  updateUser: async (id: string, user: Partial<User>) => {
    await delay()
    return {} as UserWithoutPassword
  },
  deleteUser: async (id: string) => {
    await delay()
    return {} as UserWithoutPassword
  },
}

const clearUserMemory = async () => {
  await delay()
  users.splice(0, users.length)
}

export { MemoryUserRepository }
