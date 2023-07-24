import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { instantiatedUserService } from '../factories/user.factory'
import { MemoryImageRepository } from '../repositories/implementations/memory/image.repository'
import { MemoryPostRepository } from '../repositories/implementations/memory/post.repository'
import { MemoryUserRepository } from '../repositories/implementations/memory/user.repository'
import { handleZodParse } from '../utils'

// const UserService = instantiatedUserService(
//   PrismaUserRepository,
//   PrismaImageRepository,
// )

const UserService = instantiatedUserService(
  MemoryUserRepository,
  MemoryImageRepository,
  MemoryPostRepository,
)

const UserController = {
  getUsers: async (request: FastifyRequest, reply: FastifyReply) => {
    const { ok, message, payload } = await UserService.getUsers()

    if (!ok || !payload) return reply.status(400).send({ message })

    const users = payload.map((user) => ({
      ...user,
      password: undefined,
    }))

    return reply.status(200).send({ message, payload: users })
  },

  getUserById: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z.object({
      id: z.string().nonempty('Id is required on url params'),
    })

    const { ok: okParse, payload: payloadParse } = handleZodParse(
      request.params as object,
      paramsSchema,
    )

    if (!okParse) {
      reply.status(400).send(payloadParse)
      return
    }

    const { id } = payloadParse

    const { ok, message, payload } = await UserService.getUserById(id)

    if (!ok || !payload) return reply.status(400).send({ message })

    const user = {
      ...payload,
      password: undefined,
    }

    return reply.status(200).send({ message, payload: user })
  },

  getUserByUsername: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z.object({
      username: z.string().nonempty('Username is required on url params'),
    })

    const { ok: okParse, payload: payloadParse } = handleZodParse(
      request.params as object,
      paramsSchema,
    )

    if (!okParse) {
      reply.status(400).send(payloadParse)
      return
    }

    const { username } = payloadParse

    const { ok, message, payload } = await UserService.getUserByUsername(
      username,
    )

    if (!ok || !payload) return reply.status(400).send({ message })

    const user = {
      ...payload,
      password: undefined,
    }

    return reply.status(200).send({ message, payload: user })
  },

  getUserByEmail: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        email: z
          .string()
          .nonempty('Email is required on url params')
          .email('Email is invalid'),
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

    const { email } = payloadParse

    const { ok, message, payload } = await UserService.getUserByEmail(email)

    if (!ok || !payload) return reply.status(400).send({ message })

    const user = {
      ...payload,
      password: undefined,
    }

    return reply.status(200).send({ message, payload: user })
  },

  createUser: async (request: FastifyRequest, reply: FastifyReply) => {
    const userSchema = z
      .object({
        fullName: z.string().nonempty('Full name is required'),
        username: z.string().nonempty('Username is required'),
        email: z
          .string()
          .nonempty('Email is required')
          .email('Email is invalid'),
        password: z.string().nonempty('Password is required').min(8, {
          message: 'Password must be at least 8 characters long',
        }),
      })
      .strict()

    const { ok: okParse, payload: payloadParse } = handleZodParse(
      request.body as object,
      userSchema,
    )

    if (!okParse) {
      reply.status(400).send(payloadParse)
      return
    }

    const user = payloadParse

    const { ok, message, payload } = await UserService.createUser(user)

    if (!ok || !payload) return reply.status(400).send({ message })

    const userWithoutPassword = {
      ...payload,
      password: undefined,
    }

    return reply.status(200).send({ message, payload: userWithoutPassword })
  },

  updateUser: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        id: z.string().nonempty('Id is required on url params'),
      })
      .strict()

    const { ok: okParseParams, payload: payloadParseParams } = handleZodParse(
      request.params as object,
      paramsSchema,
    )

    if (!okParseParams) {
      reply.status(400).send(payloadParseParams)
      return
    }

    const { id } = payloadParseParams

    const userSchema = z
      .object({
        fullName: z.string().optional(),
        username: z.string().optional(),
        email: z.string().optional(),
        password: z.string().optional(),
        biography: z.string().optional(),
        profilePicture: z.string().optional(),
      })
      .strict()
      .refine(
        (data) => Object.keys(data).length > 0,
        'At least one field is required to update: fullName, username, email, password, biography, profilePicture',
      )

    const { ok: okParseBody, payload: payloadParseBody } = handleZodParse(
      request.body as object,
      userSchema,
    )

    if (!okParseBody) {
      reply.status(400).send(payloadParseBody)
      return
    }

    const user = payloadParseBody

    const { ok, message, payload } = await UserService.updateUser(id, user)

    if (!ok || !payload) return reply.status(400).send({ message })

    const userWithoutPassword = {
      ...payload,
      password: undefined,
    }

    return reply.status(200).send({ message, payload: userWithoutPassword })
  },

  deleteUser: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        id: z.string().nonempty('Id is required on url params'),
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

    const { id } = payloadParse

    const { ok, message, payload } = await UserService.deleteUser(id)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },

  getUserImages: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        id: z.string().nonempty('Id is required on url params'),
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

    const { id } = payloadParse

    const { ok, message, payload } = await UserService.getUserImages(id)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },

  getUserPosts: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        id: z.string().nonempty('Id is required on url params'),
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

    const { id } = payloadParse

    const { ok, message, payload } = await UserService.getUserPosts(id)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
}

export { UserController }
