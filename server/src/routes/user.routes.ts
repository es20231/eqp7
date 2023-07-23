import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { UserController } from '../controllers/user.controller'

const UserRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any,
) => {
  fastify.get('/users', options, UserController.getUsers)
  fastify.get('/users/:id', options, UserController.getUserById)
  fastify.get(
    '/users/username/:username',
    options,
    UserController.getUserByUsername,
  )
  fastify.get('/users/email/:email', options, UserController.getUserByEmail)
  fastify.post('/users', options, UserController.createUser)
  fastify.put('/users/:id', options, UserController.updateUser)
  fastify.delete('/users/:id', options, UserController.deleteUser)

  done()
}

export { UserRoutes }
