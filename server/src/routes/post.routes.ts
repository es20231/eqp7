import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { PostController } from '../controllers/post.controller'
import {
  createPostSchema,
  deletePostSchema,
  getPostByIdSchema,
  getPostsByUserIdSchema,
  getPostsSchema,
  updatePostSchema,
} from '../docs/swagger/schemas/post.schema'
import { authenticate } from '../middlewares/auth.middleware'

const PostRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any,
) => {
  const optionsWithAuth = {
    ...options,
    preValidation: authenticate,
  }

  const optionsWithSchema = {
    getPosts: {
      ...optionsWithAuth,
      schema: getPostsSchema,
    },
    getPostById: {
      ...optionsWithAuth,
      schema: getPostByIdSchema,
    },
    getPostsByUserId: {
      ...optionsWithAuth,
      schema: getPostsByUserIdSchema,
    },
    create: {
      ...optionsWithAuth,
      schema: createPostSchema,
    },
    update: {
      ...optionsWithAuth,
      schema: updatePostSchema,
    },
    delete: {
      ...optionsWithAuth,
      schema: deletePostSchema,
    },
  }

  fastify.get('/posts', optionsWithSchema.getPosts, PostController.getPosts)
  fastify.get(
    '/posts/:id',
    optionsWithSchema.getPostById,
    PostController.getPostById,
  )
  fastify.get(
    '/posts/user/:id',
    optionsWithSchema.getPostsByUserId,
    PostController.getPostsByUserId,
  )
  fastify.post('/posts', optionsWithSchema.create, PostController.createPost)
  fastify.patch(
    '/posts/:id',
    optionsWithSchema.update,
    PostController.updatePost,
  )
  fastify.delete(
    '/posts/:id',
    optionsWithSchema.delete,
    PostController.deletePost,
  )
  done()
}

export { PostRoutes }
