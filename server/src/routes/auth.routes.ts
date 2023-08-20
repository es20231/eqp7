import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { AuthController } from '../controllers/auth.controller'
import {
  activateSchema,
  getActivateTokenSchema,
  loginSchema,
  registerSchema,
} from '../docs/swagger/schemas/auth.schema'
import { authenticate } from '../middlewares/auth.middleware'

const AuthRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any,
) => {
  const optionsWithSchema = {
    login: {
      ...options,
      schema: loginSchema,
    },
    register: {
      ...options,
      schema: registerSchema,
    },
    activate: {
      ...options,
      preValidation: authenticate,
      schema: activateSchema,
    },
    getActivateToken: {
      ...options,
      preValidation: authenticate,
      schema: getActivateTokenSchema,
    },
  }

  fastify.post('/auth/login', optionsWithSchema.login, AuthController.login)
  fastify.post(
    '/auth/register',
    optionsWithSchema.register,
    AuthController.register,
  )
  fastify.get(
    '/auth/activate/:token',
    optionsWithSchema.activate,
    AuthController.activate,
  )
  fastify.get(
    '/auth/token/:id',
    optionsWithSchema.getActivateToken,
    AuthController.getActivateToken,
  )

  done()
}

export { AuthRoutes }
