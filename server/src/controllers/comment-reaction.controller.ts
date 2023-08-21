import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { instantiatedCommentReactionService } from '../factories/comment-reaction.factory'
import { PrismaCommentReactionRepository } from '../repositories/implementations/prisma/comment-reaction.repository'
import { PrismaCommentRepository } from '../repositories/implementations/prisma/comment.repository'
import { PrismaPostRepository } from '../repositories/implementations/prisma/post.repository'
import { PrismaUserRepository } from '../repositories/implementations/prisma/user.repository'
import { handleZodParse } from '../utils'

const commentReactionService = instantiatedCommentReactionService(
  PrismaCommentReactionRepository,
  PrismaUserRepository,
  PrismaPostRepository,
  PrismaCommentRepository,
)

const CommentReactionController = {
  getCommentReactions: async (request: FastifyRequest, reply: FastifyReply) => {
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

    const { ok, message, payload } =
      await commentReactionService.getCommentReactions(type, take, skip)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  getCommentReactionById: async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
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
      await commentReactionService.getCommentReactionById(id)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  getCommentReactionsByCommentId: async (
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
        id: z.string().nonempty('Comment id is required on url params'),
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
      await commentReactionService.getCommentReactionsByCommentId(
        id,
        type,
        take,
        skip,
      )

    if (!ok || payload === undefined) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  getCommentReactionsAmountByCommentId: async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const paramsSchema = z
      .object({
        id: z.string().nonempty('Comment id is required on url params'),
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
      await commentReactionService.getCommentReactionsByCommentId(id)

    if (!ok || payload === undefined) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({
      message,
      payload: {
        commentId: id,
        likes: payload.filter((reaction) => reaction.type === 'like').length,
        dislikes: payload.filter((reaction) => reaction.type === 'dislike')
          .length,
      },
    })
  },
  getCommentReactionsByUserId: async (
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
        id: z.string().nonempty('User id is required on url params'),
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
      await commentReactionService.getCommentReactionsByUserId(
        id,
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
  createCommentReaction: async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const bodySchema = z
      .object({
        type: z
          .string()
          .nonempty('Type is required on body')
          .refine((value) => value === 'like' || value === 'dislike', {
            message: 'Type must be like or dislike',
          }),
        commentId: z.string().nonempty('Comment id is required on body'),
        userId: z.string().nonempty('User id is required on body'),
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

    const { type, commentId, userId } = payloadParse

    const { ok, message, payload } =
      await commentReactionService.createCommentReaction({
        type,
        commentId,
        userId,
      })

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(201).send({ message, payload })
  },
  deleteCommentReaction: async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
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
      await commentReactionService.deleteCommentReaction(id, request.user?.id)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
}

export { CommentReactionController }
