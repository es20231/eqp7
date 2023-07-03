import { User } from '../../../entities/user.entity';
import { prisma } from '../../../lib/prisma';
import { IUserRepository, UserWithoutPassword } from '../../iuser.repository';

const PrismaUserRepository: IUserRepository = {
  getUserById: (id: string): Promise<{ ok: boolean; message: string; payload: UserWithoutPassword | undefined }> => {
    prisma
    throw new Error('Function not implemented.')
  },
  getUserByUsername: (username: string): Promise<{ ok: boolean; message: string; payload: UserWithoutPassword | undefined }> => {
    throw new Error('Function not implemented.')
  },
  getUserByEmail: (email: string): Promise<{ ok: boolean; message: string; payload: UserWithoutPassword | undefined }> => {
    throw new Error('Function not implemented.')
  },
  getUsers: (): Promise<{ ok: boolean; message: string; payload: UserWithoutPassword[] | undefined }> => {
    throw new Error('Function not implemented.')
  },
  createUser: (user: User): Promise<{ ok: boolean; message: string; payload: UserWithoutPassword | undefined }> => {
    throw new Error('Function not implemented.')
  },
  updateUser: (id: string, user: Partial<User>): Promise<{ ok: boolean; message: string; payload: UserWithoutPassword | undefined }> => {
    throw new Error('Function not implemented.')
  },
  deleteUser: (id: string): Promise<{ ok: boolean; message: string; payload: UserWithoutPassword | undefined }> => {
    throw new Error('Function not implemented.')
  }
}