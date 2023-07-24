import { FastifyReply, FastifyRequest } from 'fastify'
import { MemoryImageRepository } from '../repositories/implementations/memory/image.repository'
import { MemoryUserRepository } from '../repositories/implementations/memory/user.repository'
import { z } from 'zod'
import { handleZodParse } from '../utils'
import { CreateUserDTO } from '../dtos/user/create-user.dto'
import { instantiatedAuthService } from '../factories/auth.factory'

const authService = instantiatedAuthService(
  MemoryUserRepository,
  MemoryImageRepository,
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
}

export { AuthController }
