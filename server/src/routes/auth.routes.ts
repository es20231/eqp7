import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { AuthController } from '../controllers/auth.controller'

const AuthRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any,
) => {
  fastify.post('/auth/login', options, AuthController.login)
  fastify.post('/auth/register', options, AuthController.register)

  done()
}

export { AuthRoutes }
