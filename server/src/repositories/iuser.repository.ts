import { User } from "../entities/user.entity";

type RepositoryResult<T> = {
  ok: boolean;
  message: string;
  payload: T | undefined
}

type UserWithoutPassword = Omit<User, "password">

interface IUserRepository {
  getUserById(id: string): Promise<RepositoryResult<UserWithoutPassword>>;
  getUserByUsername(username: string): Promise<RepositoryResult<UserWithoutPassword>>;
  getUserByEmail(email: string): Promise<RepositoryResult<UserWithoutPassword>>;
  getUsers(): Promise<RepositoryResult<UserWithoutPassword[]>>;
  createUser(user: User): Promise<RepositoryResult<UserWithoutPassword>>;
  updateUser(id:string, user: Partial<UserWithoutPassword>): Promise<RepositoryResult<UserWithoutPassword>>;
  deleteUser(id: string): Promise<RepositoryResult<UserWithoutPassword>>;
}

export { IUserRepository, UserWithoutPassword };
