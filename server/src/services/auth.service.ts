import { CreateUserDTO } from '../dtos/user/create-user.dto'
import { User } from '../entities/user.entity'
import { instantiatedUserService } from '../factories/user.factory'
import { IImageRepository } from '../repositories/iimage.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { ServiceResult } from './result'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET

interface IAuthService {
  login: (
    username: string,
    password: string,
  ) => Promise<ServiceResult<{ token: string; user: User }>>
  register: (
    user: CreateUserDTO,
  ) => Promise<ServiceResult<{ token: string; user: User }>>
}

interface UserServiceProps {
  userRepository: IUserRepository
  imageRepository: IImageRepository
}

interface AuthServiceProps {
  userServiceProps: UserServiceProps
}

const AuthService = ({
  userServiceProps: { userRepository, imageRepository },
}: AuthServiceProps): IAuthService => ({
  login: async (username, password) => {
    if (!jwtSecret) throw new Error('JWT secret not found')

    const userService = instantiatedUserService(userRepository, imageRepository)

    const { ok, message, payload } = await userService.getUserByUsername(
      username,
    )

    if (!ok || !payload) return { ok, message, payload: undefined }

    const user = payload

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid)
      return { ok: false, message: 'Invalid password', payload: undefined }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      jwtSecret,
      { expiresIn: '7d' },
    )

    return {
      ok: true,
      message: 'User logged in successfully',
      payload: { token, user },
    }
  },
  register: async (user) => {
    if (!jwtSecret) throw new Error('JWT secret not found')

    const userService = instantiatedUserService(userRepository, imageRepository)

    const { ok, message, payload } = await userService.createUser(user)

    if (!ok || !payload) return { ok, message, payload: undefined }

    const newUser = payload

    const token = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      jwtSecret,
      { expiresIn: '7d' },
    )

    return {
      ok: true,
      message: 'User registered successfully',
      payload: { token, user: newUser },
    }
  },
})

export { AuthService }
