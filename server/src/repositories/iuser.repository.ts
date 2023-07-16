import { CreateUserDTO } from '../dtos/user/create-user.dto'
import { UpdateUserDTO } from '../dtos/user/update-user.dto'
import { User } from '../entities/user.entity'

type UserWithoutPassword = Omit<User, 'password'>

interface IUserRepository {
  getUserById(id: string): Promise<UserWithoutPassword | undefined>
  getUserByUsername(username: string): Promise<UserWithoutPassword | undefined>
  getUserByEmail(email: string): Promise<UserWithoutPassword | undefined>
  getUsers(): Promise<UserWithoutPassword[]>
  createUser(user: CreateUserDTO): Promise<UserWithoutPassword>
  updateUser(id: string, user: UpdateUserDTO): Promise<UserWithoutPassword>
  deleteUser(id: string): Promise<UserWithoutPassword>
}

export { IUserRepository, UserWithoutPassword }
