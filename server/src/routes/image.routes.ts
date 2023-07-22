import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { ImageController } from '../controllers/image.controller'

const ImageRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any,
) => {
  fastify.get('/images', options, ImageController.getImages)
  fastify.get('/images/:id', options, ImageController.getImage)
  fastify.post('/images', options, ImageController.createImage)
  fastify.delete('/images/:id', options, ImageController.deleteImage)

  fastify.get('/images/user/:id', options, ImageController.getUserImages)

  done()
}

export { ImageRoutes }
