import { CreateUserDTO } from '../dtos/user/create-user.dto'
import { User } from '../entities/user.entity'
import { RepositoryResult } from './result'

type UserWithoutPassword = Omit<User, 'password'>

interface IUserRepository {
  getUserById(id: string): Promise<RepositoryResult<UserWithoutPassword>>
  getUserByUsername(
    username: string,
  ): Promise<RepositoryResult<UserWithoutPassword>>
  getUserByEmail(email: string): Promise<RepositoryResult<UserWithoutPassword>>
  getUsers(): Promise<RepositoryResult<UserWithoutPassword[]>>
  createUser(
    user: CreateUserDTO,
  ): Promise<RepositoryResult<UserWithoutPassword>>
  updateUser(
    id: string,
    user: UpdateUserDTO,
  ): Promise<RepositoryResult<UserWithoutPassword>>
  deleteUser(id: string): Promise<RepositoryResult<UserWithoutPassword>>
}

export { IUserRepository, UserWithoutPassword }
