import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { PostReactionController } from '../controllers/post-reaction.controller'
import {
  getPostReactionsSchema,
  getPostReactionByIdSchema,
  getPostReactionsByUserIdSchema,
  getPostReactionsByPostIdSchema,
  createPostReactionSchema,
  deletePostReactionSchema,
} from '../docs/swagger/schemas/post-reaction.schema'
import { authenticate } from '../middlewares/auth.middleware'

const PostReactionRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any,
) => {
  const optionsWithAuth = {
    ...options,
    preValidation: authenticate,
  }

  const optionsWithSchema = {
    getPostReactions: {
      ...optionsWithAuth,
      schema: getPostReactionsSchema,
    },
    getPostReactionById: {
      ...optionsWithAuth,
      schema: getPostReactionByIdSchema,
    },
    getPostReactionsByUserId: {
      ...optionsWithAuth,
      schema: getPostReactionsByUserIdSchema,
    },
    getPostReactionsByPostId: {
      ...optionsWithAuth,
      schema: getPostReactionsByPostIdSchema,
    },
    create: {
      ...optionsWithAuth,
      schema: createPostReactionSchema,
    },
    delete: {
      ...optionsWithAuth,
      schema: deletePostReactionSchema,
    },
  }

  fastify.get(
    '/post-reactions',
    optionsWithSchema.getPostReactions,
    PostReactionController.getPostReactions,
  )
  fastify.get(
    '/post-reactions/:id',
    optionsWithSchema.getPostReactionById,
    PostReactionController.getPostReactionById,
  )
  fastify.get(
    '/post-reactions/user/:id',
    optionsWithSchema.getPostReactionsByUserId,
    PostReactionController.getPostReactionsByUserId,
  )
  fastify.get(
    '/post-reactions/post/:id',
    optionsWithSchema.getPostReactionsByPostId,
    PostReactionController.getPostReactionsByPostId,
  )
  fastify.post(
    '/post-reactions',
    optionsWithSchema.create,
    PostReactionController.createPostReaction,
  )
  fastify.delete(
    '/post-reactions/:id',
    optionsWithSchema.delete,
    PostReactionController.deletePostReaction,
  )

  done()
}

export { PostReactionRoutes }
