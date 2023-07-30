import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { UserController } from '../controllers/user.controller'
import {
  createUserSchema,
  deleteUserSchema,
  getUserByEmailSchema,
  getUserByIdSchema,
  getUserByUsernameSchema,
  getUserImagesSchema,
  getUserPostsSchema,
  getUsersSchema,
  updateUserSchema,
} from '../docs/swagger/schemas/user.schema'
import { authenticate } from '../middlewares/auth.middleware'

const UserRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any,
) => {
  const optionsWithAuth = {
    ...options,
    preValidation: authenticate,
  }

  const optionsWithSchema = {
    getUsers: {
      ...optionsWithAuth,
      schema: getUsersSchema,
    },
    getUserById: {
      ...optionsWithAuth,
      schema: getUserByIdSchema,
    },
    getUserByUsername: {
      ...optionsWithAuth,
      schema: getUserByUsernameSchema,
    },
    getUserByEmail: {
      ...optionsWithAuth,
      schema: getUserByEmailSchema,
    },
    create: {
      ...optionsWithAuth,
      schema: createUserSchema,
    },
    update: {
      ...optionsWithAuth,
      schema: updateUserSchema,
    },
    delete: {
      ...optionsWithAuth,
      schema: deleteUserSchema,
    },
    getUserImages: {
      ...optionsWithAuth,
      schema: getUserImagesSchema,
    },
    getUserPosts: {
      ...optionsWithAuth,
      schema: getUserPostsSchema,
    },
  }

  fastify.get('/users', optionsWithSchema.getUsers, UserController.getUsers)
  fastify.get(
    '/users/:id',
    optionsWithSchema.getUserById,
    UserController.getUserById,
  )
  fastify.get(
    '/users/username/:username',
    optionsWithSchema.getUserByUsername,
    UserController.getUserByUsername,
  )
  fastify.get(
    '/users/email/:email',
    optionsWithSchema.getUserByEmail,
    UserController.getUserByEmail,
  )

  fastify.get(
    '/users/:id/images',
    optionsWithSchema.getUserImages,
    UserController.getUserImages,
  )
  fastify.get(
    '/users/:id/posts',
    optionsWithSchema.getUserPosts,
    UserController.getUserPosts,
  )

  fastify.post('/users', optionsWithSchema.create, UserController.createUser)
  fastify.put('/users/:id', optionsWithSchema.update, UserController.updateUser)
  fastify.delete(
    '/users/:id',
    optionsWithSchema.delete,
    UserController.deleteUser,
  )

  done()
}

export { UserRoutes }
