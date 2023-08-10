import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { instantiatedCommentService } from '../factories/comment.factory'
import { MemoryCommentRepository } from '../repositories/implementations/memory/comment.repository'
import { MemoryPostRepository } from '../repositories/implementations/memory/post.repository'
import { MemoryUserRepository } from '../repositories/implementations/memory/user.repository'
import { handleZodParse } from '../utils'

const commentService = instantiatedCommentService(
  MemoryCommentRepository,
  MemoryUserRepository,
  MemoryPostRepository,
)

const CommentController = {
  getComments: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        take: z.string().optional(),
        skip: z.string().optional(),
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

    const { take, skip } = payloadParse

    const { ok, message, payload } = await commentService.getComments(
      take,
      skip,
    )

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  getCommentById: async (request: FastifyRequest, reply: FastifyReply) => {
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

    const { ok, message, payload } = await commentService.getCommentById(id)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  getCommentsByUserId: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        id: z.string().nonempty('User id is required on url params'),
        take: z.string().nonempty('Take is required on url params'),
        skip: z.string().nonempty('Skip is required on url params'),
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

    const { id, take, skip } = payloadParse

    const { ok, message, payload } = await commentService.getCommentsByUserId(
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
  getCommentsByPostId: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        id: z.string().nonempty('Post id is required on url params'),
        take: z.string().nonempty('Take is required on url params'),
        skip: z.string().nonempty('Skip is required on url params'),
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

    const { id, take, skip } = payloadParse

    const { ok, message, payload } = await commentService.getCommentsByPostId(
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
  createComment: async (request: FastifyRequest, reply: FastifyReply) => {
    const bodySchema = z
      .object({
        content: z.string().nonempty('Content is required on body'),
        userId: z.string().nonempty('User id is required on body'),
        postId: z.string().nonempty('Post id is required on body'),
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

    const { content, userId, postId } = payloadParse

    const { ok, message, payload } = await commentService.createComment({
      content,
      userId,
      postId,
    })

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(201).send({ message, payload })
  },
  deleteComment: async (request: FastifyRequest, reply: FastifyReply) => {
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

    const { ok, message, payload } = await commentService.deleteComment(id)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
}

export { CommentController }
