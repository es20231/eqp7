import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { instantiatedPostService } from '../factories/post.factory'
import { PrismaImageRepository } from '../repositories/implementations/prisma/image.repository'
import { PrismaPostRepository } from '../repositories/implementations/prisma/post.repository'
import { PrismaUserRepository } from '../repositories/implementations/prisma/user.repository'
import { handleZodParse } from '../utils'

// const postService = instantiatedPostService(
//   MemoryPostRepository,
//   MemoryUserRepository,
//   MemoryImageRepository,
// )

const postService = instantiatedPostService(
  PrismaPostRepository,
  PrismaUserRepository,
  PrismaImageRepository,
)

const PostController = {
  getPosts: async (request: FastifyRequest, reply: FastifyReply) => {
    const queryParamsSchema = z
      .object({
        take: z.number().int().nonnegative().optional(),
        skip: z.number().int().nonnegative().optional(),
      })
      .strict()

    const { ok: okParse, payload: payloadParse } = handleZodParse(
      request.query as object,
      queryParamsSchema,
    )

    if (!okParse) {
      reply.status(400).send(payloadParse)
      return
    }

    const { take, skip } = payloadParse

    const { ok, message, payload } = await postService.getPosts(take, skip)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  getPostById: async (request: FastifyRequest, reply: FastifyReply) => {
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

    const { ok, message, payload } = await postService.getPostById(id)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  getPostsByUserId: async (request: FastifyRequest, reply: FastifyReply) => {
    const queryParamsSchema = z
      .object({
        take: z.number().int().nonnegative().optional(),
        skip: z.number().int().nonnegative().optional(),
      })
      .strict()

    const paramsSchema = z
      .object({
        id: z.string().nonempty('User id is required on url params'),
      })
      .strict()

    const { ok: okParseQueryParams, payload: payloadParseQueryParams } =
      handleZodParse(request.query as object, queryParamsSchema)

    const { ok: okParseParams, payload: payloadParseParams } = handleZodParse(
      request.params as object,
      paramsSchema,
    )

    if (!okParseQueryParams) {
      reply.status(400).send(payloadParseQueryParams)
      return
    }

    if (!okParseParams) {
      reply.status(400).send(payloadParseParams)
      return
    }

    const { take, skip } = payloadParseQueryParams
    const { id } = payloadParseParams

    const { ok, message, payload } = await postService.getPostsByUserId(
      id,
      take,
      skip,
    )

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  createPost: async (request: FastifyRequest, reply: FastifyReply) => {
    const bodySchema = z
      .object({
        subtitle: z.string().nonempty('subtitle is required'),
        userId: z.string().nonempty('userId is required'),
        imageId: z.string().nonempty('imageId is required'),
        filter: z.string().optional(),
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

    const { subtitle, userId, imageId, filter } = payloadParse

    const { ok, message, payload } = await postService.createPost({
      subtitle,
      userId,
      imageId,
      filter,
    })

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(201).send({ message, payload })
  },
  deletePost: async (request: FastifyRequest, reply: FastifyReply) => {
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

    const { ok, message, payload } = await postService.deletePost(id)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  updatePost: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        id: z.string().nonempty('Id is required on url params'),
      })
      .strict()

    const bodySchema = z
      .object({
        subtitle: z.string().optional(),
        userId: z.string().optional(),
        imageId: z.string().optional(),
        filter: z.string().optional(),
      })
      .strict()
      .refine(
        (data) => {
          return Object.keys(data).length > 0
        },
        {
          message:
            'At least one field is required to update: subtitle, userId, imageId, filter',
        },
      )

    const { ok: okParseParams, payload: payloadParseParams } = handleZodParse(
      request.params as object,
      paramsSchema,
    )

    const { ok: okParseBody, payload: payloadParseBody } = handleZodParse(
      request.body as object,
      bodySchema,
    )

    if (!okParseParams) {
      reply.status(400).send(payloadParseParams)
      return
    }

    if (!okParseBody) {
      reply.status(400).send(payloadParseBody)
      return
    }

    const { id } = payloadParseParams

    const postToUpdate = payloadParseBody

    const { ok, message, payload } = await postService.updatePost(
      id,
      postToUpdate,
    )

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
}

export { PostController }
