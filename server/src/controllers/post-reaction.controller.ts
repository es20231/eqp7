import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { instantiatedPostReactionService } from '../factories/post-reaction.factory'
import { PrismaPostReactionRepository } from '../repositories/implementations/prisma/post-reaction.repository'
import { PrismaPostRepository } from '../repositories/implementations/prisma/post.repository'
import { PrismaUserRepository } from '../repositories/implementations/prisma/user.repository'
import { handleZodParse } from '../utils'

const postReactionService = instantiatedPostReactionService(
  PrismaPostReactionRepository,
  PrismaUserRepository,
  PrismaPostRepository,
)

const PostReactionController = {
  getPostReactions: async (request: FastifyRequest, reply: FastifyReply) => {
    const queryParamsSchema = z
      .object({
        type: z.string().optional(),
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

    const { type, take, skip } = payloadParse

    const { ok, message, payload } = await postReactionService.getPostReactions(
      type,
      take,
      skip,
    )

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  getPostReactionById: async (request: FastifyRequest, reply: FastifyReply) => {
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

    const { ok, message, payload } =
      await postReactionService.getPostReactionById(id)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  getPostReactionsByPostId: async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const queryParamsSchema = z
      .object({
        type: z.string().optional(),
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

    const { type, take, skip } = payloadParse

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

    const { ok, message, payload } =
      await postReactionService.getPostReactionsByPostId(id, type, take, skip)

    if (!ok || payload === undefined) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  getPostReactionsAmountByPostId: async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
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

    const { ok, message, payload } =
      await postReactionService.getPostReactionsByPostId(id)

    if (!ok || payload === undefined) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({
      message,
      payload: {
        postId: id,
        likes: payload.filter((reaction) => reaction.type === 'like').length,
        dislikes: payload.filter((reaction) => reaction.type === 'dislike')
          .length,
      },
    })
  },
  getPostReactionsByUserId: async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const queryParamsSchema = z
      .object({
        type: z.string().optional(),
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

    const { type, take, skip } = payloadParse

    const paramsSchema = z.object({
      id: z.string().nonempty('Id is required on url params'),
    })

    const { ok: okParseParams, payload: payloadParseParams } = handleZodParse(
      request.params as object,
      paramsSchema,
    )

    if (!okParseParams) {
      reply.status(400).send(payloadParseParams)
      return
    }

    const { id } = payloadParseParams

    const { ok, message, payload } =
      await postReactionService.getPostReactionsByUserId(id, type, take, skip)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  createPostReaction: async (request: FastifyRequest, reply: FastifyReply) => {
    const bodySchema = z
      .object({
        type: z
          .string()
          .nonempty('Type is required')
          .refine((value) => {
            return value === 'like' || value === 'dislike'
          }, 'Type must be like or dislike'),
        postId: z.string().nonempty('PostId is required'),
        userId: z.string().nonempty('UserId is required'),
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

    const { type, postId, userId } = payloadParse

    const { ok, message, payload } =
      await postReactionService.createPostReaction({ type, postId, userId })

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(201).send({ message, payload })
  },
  deletePostReaction: async (request: FastifyRequest, reply: FastifyReply) => {
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

    const { ok, message, payload } =
      await postReactionService.deletePostReaction(id, request.user?.id)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
}

export { PostReactionController }
