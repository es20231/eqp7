import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { UserController } from '../controllers/user.controller'
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

  fastify.get('/users', optionsWithAuth, UserController.getUsers)
  fastify.get('/users/:id', optionsWithAuth, UserController.getUserById)
  fastify.get(
    '/users/username/:username',
    optionsWithAuth,
    UserController.getUserByUsername,
  )
  fastify.get(
    '/users/email/:email',
    optionsWithAuth,
    UserController.getUserByEmail,
  )
  fastify.post('/users', optionsWithAuth, UserController.createUser)
  fastify.put('/users/:id', optionsWithAuth, UserController.updateUser)
  fastify.delete('/users/:id', optionsWithAuth, UserController.deleteUser)

  done()
}

export { UserRoutes }
