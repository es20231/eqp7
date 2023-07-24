import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { CreateUserDTO } from '../dtos/user/create-user.dto'
import { User } from '../entities/user.entity'
import { instantiatedActivateTokenService } from '../factories/activate-token.factory'
import { instantiatedUserService } from '../factories/user.factory'
import { IActivateTokenRepository } from '../repositories/iactivate-token.repository'
import { IImageRepository } from '../repositories/iimage.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { generateRandomId } from '../utils'
import { IMailService } from './outsourced/IMailService'
import { ServiceResult } from './result'

const jwtSecret = process.env.JWT_SECRET

interface IAuthService {
  login: (
    username: string,
    password: string,
  ) => Promise<ServiceResult<{ token: string; user: User }>>
  register: (
    user: CreateUserDTO,
  ) => Promise<ServiceResult<{ token: string; user: User }>>
  activate: (token: string) => Promise<ServiceResult<User>>
  getActivateToken: (userId: string) => Promise<ServiceResult<undefined>>
}

interface UserServiceProps {
  userRepository: IUserRepository
  imageRepository: IImageRepository
}

interface ActivateTokenServiceProps {
  activateTokenRepository: IActivateTokenRepository
}

interface MailServiceProps {
  mailService: IMailService
}

interface AuthServiceProps {
  userServiceProps: UserServiceProps
  activateTokenServiceProps: ActivateTokenServiceProps
  mailServiceProps: MailServiceProps
}

const AuthService = ({
  userServiceProps: { userRepository, imageRepository },
  activateTokenServiceProps: { activateTokenRepository },
  mailServiceProps: { mailService },
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

    const activateTokenService = instantiatedActivateTokenService(
      activateTokenRepository,
      userRepository,
    )

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

    const {
      ok: activateTokenOk,
      message: activateTokenMessage,
      payload: payloadActivateToken,
    } = await activateTokenService.create({
      userId: newUser.id,
      token: `${generateRandomId()}${generateRandomId()}`,
    })

    if (!activateTokenOk || !payloadActivateToken) {
      return {
        ok: false,
        message: activateTokenMessage,
        payload: undefined,
      }
    }

    await mailService.sendMail({
      to: user.email,
      subject: 'Account activation - MinIG',
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333;">
          <p>Olá,</p>
          <p>Obrigado por se registrar no MinIG! Para ativar sua conta, por favor clique no botão abaixo:</p>
          <p style="text-align: center;">
            <a href="http://localhost:3333/auth/activate/${payloadActivateToken.token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Ativar Conta</a>
          </p>
          <p>Se você não se registrou para uma conta no MinIG, por favor ignore este e-mail.</p>
          <p>Obrigado,</p>
          <p>A equipe do MinIG</p>
        </div>
      `,
    })

    return {
      ok: true,
      message: 'User registered successfully',
      payload: { token, user: newUser },
    }
  },
  activate: async (token) => {
    const userService = instantiatedUserService(userRepository, imageRepository)

    const activateTokenService = instantiatedActivateTokenService(
      activateTokenRepository,
      userRepository,
    )

    const { ok, message, payload } = await activateTokenService.getByToken(
      token,
    )

    if (!ok || !payload) return { ok, message, payload: undefined }

    const activateToken = payload

    if (activateToken.activatedAt) {
      return {
        ok: false,
        message: 'Activate token already used',
        payload: undefined,
      }
    }

    const {
      ok: userOk,
      message: userMessage,
      payload: userPayload,
    } = await userService.getUserById(activateToken.userId)

    if (!userOk || !userPayload)
      return { ok: userOk, message: userMessage, payload: undefined }

    const user = userPayload

    const {
      ok: activateTokenUpdateOk,
      message: activateTokenUpdateMessage,
      payload: activateTokenUpdatePayload,
    } = await activateTokenService.update(activateToken.id, {
      activatedAt: new Date(),
    })

    if (!activateTokenUpdateOk || !activateTokenUpdatePayload) {
      return {
        ok: false,
        message: activateTokenUpdateMessage,
        payload: undefined,
      }
    }

    const {
      ok: okUpdateUser,
      message: messageUpdateUser,
      payload: payloadUpdateuser,
    } = await userService.updateUser(user.id, {
      emailVerified: true,
    })

    if (!okUpdateUser || !payloadUpdateuser) {
      return {
        ok: false,
        message: messageUpdateUser,
        payload: undefined,
      }
    }

    return {
      ok: true,
      message: 'User activated successfully',
      payload: payloadUpdateuser,
    }
  },
  getActivateToken: async (userId) => {
    const userService = instantiatedUserService(userRepository, imageRepository)

    const activateTokenService = instantiatedActivateTokenService(
      activateTokenRepository,
      userRepository,
    )

    const {
      ok: userOk,
      message: userMessage,
      payload: userPayload,
    } = await userService.getUserById(userId)

    if (!userOk || !userPayload) {
      return { ok: userOk, message: userMessage, payload: undefined }
    }

    const user = userPayload

    const {
      ok: activateTokenOk,
      message: activateTokenMessage,
      payload: activateTokenPayload,
    } = await activateTokenService.create({
      userId: user.id,
      token: `${generateRandomId()}${generateRandomId()}`,
    })

    if (!activateTokenOk || !activateTokenPayload)
      return {
        ok: activateTokenOk,
        message: activateTokenMessage,
        payload: undefined,
      }

    const activateToken = activateTokenPayload

    await mailService.sendMail({
      to: user.email,
      subject: 'Account activation - MinIG',
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333;">
          <p>Olá,</p>
          <p>Obrigado por se registrar no MinIG! Para ativar sua conta, por favor clique no botão abaixo:</p>
          <p style="text-align: center;">
            <a href="http://localhost:3333/auth/activate/${activateToken.token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Ativar Conta</a>
          </p>
          <p>Se você não se registrou para uma conta no MinIG, por favor ignore este e-mail.</p>
          <p>Obrigado,</p>
          <p>A equipe do MinIG</p>
        </div>
      `,
    })

    return {
      ok: true,
      message: 'Activate token found successfully',
      payload: undefined,
    }
  },
})

export { AuthService }
