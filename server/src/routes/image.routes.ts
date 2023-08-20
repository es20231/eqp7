import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { ImageController } from '../controllers/image.controller'
import {
  createImageSchema,
  deleteImageSchema,
  getImageByIdSchema,
  getImagesByUserIdSchema,
  getImagesSchema,
} from '../docs/swagger/schemas/image.schema'
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

  const optionsWithSchema = {
    getImages: {
      ...optionsWithAuth,
      schema: getImagesSchema,
    },
    getImageById: {
      ...optionsWithAuth,
      schema: getImageByIdSchema,
    },
    create: {
      ...optionsWithAuth,
      schema: createImageSchema,
    },
    delete: {
      ...optionsWithAuth,
      schema: deleteImageSchema,
    },
    getImagesByUserId: {
      ...optionsWithAuth,
      schema: getImagesByUserIdSchema,
    },
  }

  fastify.get('/images', optionsWithSchema.getImages, ImageController.getImages)
  fastify.get(
    '/images/:id',
    optionsWithSchema.getImageById,
    ImageController.getImage,
  )
  fastify.post('/images', optionsWithSchema.create, ImageController.createImage)

  fastify.delete(
    '/images/:id',
    optionsWithSchema.delete,
    ImageController.deleteImage,
  )

  fastify.get(
    '/images/user/:id',
    optionsWithSchema.getImagesByUserId,
    ImageController.getUserImages,
  )

  done()
}

export { ImageRoutes }
