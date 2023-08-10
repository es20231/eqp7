import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { CommentController } from '../controllers/comment.controller'
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentByIdSchema,
  getCommentsByPostIdSchema,
  getCommentsByUserIdSchema,
  getCommentsSchema,
} from '../docs/swagger/schemas/comment.schema'
import { authenticate } from '../middlewares/auth.middleware'

const commentRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any,
) => {
  const optionsWithAuth = {
    ...options,
    preValidation: authenticate,
  }

  const optionsWithSchema = {
    getComments: {
      ...optionsWithAuth,
      schema: getCommentsSchema,
    },
    getCommentById: {
      ...optionsWithAuth,
      schema: getCommentByIdSchema,
    },
    getCommentByUserId: {
      ...optionsWithAuth,
      schema: getCommentsByUserIdSchema,
    },
    getCommentsByPostId: {
      ...optionsWithAuth,
      schema: getCommentsByPostIdSchema,
    },
    create: {
      ...optionsWithAuth,
      schema: createCommentSchema,
    },
    delete: {
      ...optionsWithAuth,
      schema: deleteCommentSchema,
    },
  }

  fastify.get(
    '/comments',
    optionsWithSchema.getComments,
    CommentController.getComments,
  )
  fastify.get(
    '/comments/:id',
    optionsWithSchema.getCommentById,
    CommentController.getCommentById,
  )
  fastify.get(
    '/comments/user/:id',
    optionsWithSchema.getCommentByUserId,
    CommentController.getCommentsByUserId,
  )
  fastify.get(
    '/comments/post/:id',
    optionsWithSchema.getCommentsByPostId,
    CommentController.getCommentsByPostId,
  )
  fastify.post(
    '/comments',
    optionsWithSchema.create,
    CommentController.createComment,
  )
  fastify.delete(
    '/comments/:id',
    optionsWithSchema.delete,
    CommentController.deleteComment,
  )

  done()
}

export { commentRoutes }
