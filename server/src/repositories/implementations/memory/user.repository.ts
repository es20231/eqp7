import { User } from "../../../entities/user.entity";
import { IUserRepository, UserWithoutPassword } from "../../iuser.repository";

const MemoryUserRepository: IUserRepository = {
  getUserById: (id: string) => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        message: `User #${id} found`,
        payload: {} as UserWithoutPassword
      });
    });
  },
  getUserByUsername: (username: string) => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        message: `Username ${username} found`,
        payload: {} as UserWithoutPassword
      });
    });
  },
  getUserByEmail: (email: string) => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        message: `Email ${email} found`,
        payload: {} as UserWithoutPassword
      });
    });
  },
  getUsers: () => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        message: "All users",
        payload: [] as UserWithoutPassword[]
      });
    });
  },
  createUser: (user: User) => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        message: "User created",
        payload: {} as UserWithoutPassword
      });
    });
  },
  updateUser: (id: string, user: Partial<User>) => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        message: `User #${id} updated`,
        payload: {} as UserWithoutPassword
      });
    });
  },
  deleteUser: (id: string) => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        message: `User #${id} deleted`,
        payload: {} as UserWithoutPassword
      })
    })
  }
}

export { MemoryUserRepository };
