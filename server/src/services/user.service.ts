import { IUserRepository } from "../repositories/iuser.repository"

const UserService = (repository: IUserRepository) => ({
  getUsers: async () => {
    const { ok, message, payload } = await repository.getUsers()
    return {
      ok,
      message,
      payload
    }
  },

  getUserById: async (id: string) => {
    const { ok, message, payload } = await repository.getUserById(id)
    return {
      ok, 
      message,
      payload
    }
  },

  getUserByUsername: async (username: string) => {
    const { ok, message, payload } = await repository.getUserByUsername(username)
    return { ok, message, payload }
  },

  getUserByEmail: async (email: string) => {
    const { ok, message, payload } = await repository.getUserByEmail(email)
    return { ok, message, payload }
  },

  createUser: async (user: any) => {
    const { ok, message, payload } = await repository.createUser(user)
    return { ok, message, payload }
  },

  updateUser: async (id: string, user: any) => {
    const { ok, message, payload } = await repository.updateUser(id, user)
    return { ok, message, payload }
  },

  deleteUser: async (id: string) => {
    const { ok, message, payload } = await repository.deleteUser(id)
    return { ok, message, payload }
  }
})

export { UserService }
