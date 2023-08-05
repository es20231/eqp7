import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CreateActivateTokenDTO } from '../dtos/activate-token/create-activate-token.dto'
import { CreateUserDTO } from '../dtos/user/create-user.dto'
import { instantiatedAuthService } from '../factories/auth.factory'
import { PrismaActivateTokenRepository } from '../repositories/implementations/prisma/activate-token.repository'
import { PrismaImageRepository } from '../repositories/implementations/prisma/image.repository'
import { PrismaPostRepository } from '../repositories/implementations/prisma/post.repository'
import { PrismaUserRepository } from '../repositories/implementations/prisma/user.repository'
import { NodemailerMailService } from '../services/outsourced/implementations/NodemailerMailService'
import { handleZodParse } from '../utils'

// const authService = instantiatedAuthService(
//   MemoryActivateTokenRepository,
//   NodemailerMailService,
//   MemoryUserRepository,
//   MemoryImageRepository,
//   MemoryPostRepository,
// )

const authService = instantiatedAuthService(
  PrismaActivateTokenRepository,
  NodemailerMailService,
  PrismaUserRepository,
  PrismaImageRepository,
  PrismaPostRepository,
)

const AuthController = {
  login: async (request: FastifyRequest, reply: FastifyReply) => {
    const bodySchema = z
      .object({
        username: z.string().nonempty('Username is required'),
        password: z.string().nonempty('Password is required'),
      })
      .strict()

    const { ok: okParse, payload: payloadParse } = handleZodParse(
      request.body as object,
      bodySchema,
    )

    if (!okParse) {
      reply.status(400).send(payloadParse)
      return
    }

    const { username, password } = payloadParse

    const { ok, message, payload } = await authService.login(username, password)

    if (!ok || !payload) {
      reply.status(400).send({
        message:
          message.toLowerCase().includes('password') ||
          message.toLowerCase().includes('username')
            ? 'Invalid credentials'
            : message,
      })
      return
    }

    const payloadWithoutPassword = {
      ...payload,
      user: {
        ...payload.user,
        password: undefined,
      },
    }

    reply.status(200).send({ message, payload: payloadWithoutPassword })
  },
  register: async (request: FastifyRequest, reply: FastifyReply) => {
    const bodySchema = z
      .object({
        username: z.string().nonempty('Username is required'),
        password: z.string().nonempty('Password is required'),
        email: z.string().email('Email is required'),
        fullName: z.string().nonempty('Full name is required'),
      })
      .strict()

    const { ok: okParse, payload: payloadParse } = handleZodParse(
      request.body as object,
      bodySchema,
    )

    if (!okParse) {
      reply.status(400).send(payloadParse)
      return
    }

    const user: CreateUserDTO = payloadParse

    const { ok, message, payload } = await authService.register(user)

    if (!ok || !payload) {
      reply.status(400).send({ message })
      return
    }

    const payloadWithoutPassword = {
      ...payload,
      user: {
        ...payload.user,
        password: undefined,
      },
    }

    reply.status(201).send({ message, payload: payloadWithoutPassword })
  },
  activate: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        token: z.string().nonempty('Token is required on url params'),
      })
      .strict()

    const { ok: okParse, payload: payloadParse } = handleZodParse(
      request.params as object,
      paramsSchema,
    )

    if (!okParse) {
      reply.status(400).send(payloadParse)
      return
    }

    const { token }: CreateActivateTokenDTO = payloadParse

    const { ok, message, payload } = await authService.activate(token)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    const payloadWithoutPassword = {
      ...payload,
      password: undefined,
    }

    reply.status(200).send({ message, payload: payloadWithoutPassword })
  },
  getActivateToken: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        id: z.string().nonempty('User id is required on url params'),
      })
      .strict()

    const { ok: okParse, payload: payloadParse } = handleZodParse(
      request.params as object,
      paramsSchema,
    )

    if (!okParse) {
      return reply.status(400).send(payloadParse)
    }

    const { id } = payloadParse

    const { ok, message, payload } = await authService.getActivateToken(id)

    if (!ok) {
      return reply.status(400).send({ message })
    }

    return reply.status(200).send({ message, payload })
  },
}

export { AuthController }
