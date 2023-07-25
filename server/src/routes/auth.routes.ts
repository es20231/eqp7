import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { AuthController } from '../controllers/auth.controller'

const AuthRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any,
) => {
  fastify.post('/auth/login', options, AuthController.login)
  fastify.post('/auth/register', options, AuthController.register)
  fastify.get('/auth/activate/:token', options, AuthController.activate)
  fastify.get('/auth/token', options, AuthController.getActivateToken)

  done()
}

export { AuthRoutes }
