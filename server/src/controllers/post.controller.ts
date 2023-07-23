import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { instatiatedPostService } from '../factories/post.factory'
import { MemoryImageRepository } from '../repositories/implementations/memory/image.repository'
import { MemoryPostRepository } from '../repositories/implementations/memory/post.repository'
import { MemoryUserRepository } from '../repositories/implementations/memory/user.repository'
import { handleZodParse } from '../utils'

const postService = instatiatedPostService(
  MemoryPostRepository,
  MemoryUserRepository,
  MemoryImageRepository,
)

const PostController = {
  getPosts: async (request: FastifyRequest, reply: FastifyReply) => {
    const { ok, message, payload } = await postService.getPosts()

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
    const paramsSchema = z
      .object({
        userId: z.string().nonempty('userId is required on url params'),
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

    const { userId } = payloadParse

    const { ok, message, payload } = await postService.getPostsByUserId(userId)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },

  createPost: async (request: FastifyRequest, reply: FastifyReply) => {
    const bodySchema = z
      .object({
        subtitle: z.string(),
        userId: z.string().nonempty('userId is required'),
        imageId: z.string().nonempty('imageId is required'),
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

    const { subtitle, userId, imageId } = payloadParse

    const { ok, message, payload } = await postService.createPost({
      subtitle,
      userId,
      imageId,
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
        subtitle: z.string(),
        userId: z.string().optional(),
        imageId: z.string().optional(),
      })
      .strict()
      .refine(
        (data) => {
          return Object.keys(data).length > 0
        },
        {
          message:
            'At least one field is required to update: subtitle, userId, imageId',
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
    const { subtitle, userId, imageId } = payloadParseBody

    const { ok, message, payload } = await postService.updatePost(id, {
      subtitle,
      userId,
      imageId,
    })

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
}

export { PostController }
