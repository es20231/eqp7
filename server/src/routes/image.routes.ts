import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { ImageController } from '../controllers/image.controller'
import { authenticate } from '../middlewares/auth.middleware'

const ImageRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any,
) => {
  const optionsWithAuth = {
    ...options,
    preValidation: authenticate,
  }

  fastify.get('/images', optionsWithAuth, ImageController.getImages)
  fastify.get('/images/:id', optionsWithAuth, ImageController.getImage)
  fastify.post('/images', optionsWithAuth, ImageController.createImage)
  fastify.delete('/images/:id', optionsWithAuth, ImageController.deleteImage)

  fastify.get(
    '/images/user/:id',
    optionsWithAuth,
    ImageController.getUserImages,
  )

  done()
}

export { ImageRoutes }
