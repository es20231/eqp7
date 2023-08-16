import { CreateUserDTO } from '../dtos/user/create-user.dto'
import { UpdateUserDTO } from '../dtos/user/update-user.dto'
import { User } from '../entities/user.entity'

interface IUserRepository {
  getUserById(id: string): Promise<User | undefined>
  getUserByUsername(username: string): Promise<User | undefined>
  getUserByEmail(email: string): Promise<User | undefined>
  getUsers(take?: number, skip?: number): Promise<User[]>
  createUser(user: CreateUserDTO): Promise<User>
  updateUser(id: string, user: UpdateUserDTO): Promise<User>
  deleteUser(id: string): Promise<User>
}

export { IUserRepository }
