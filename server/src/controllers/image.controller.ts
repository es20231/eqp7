import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { instantiatedImageService } from '../factories/image.factory'
import { MemoryImageRepository } from '../repositories/implementations/memory/image.repository'
import { MemoryUserRepository } from '../repositories/implementations/memory/user.repository'
import { handleZodParse } from '../utils'

const ImageService = instantiatedImageService(
  MemoryImageRepository,
  MemoryUserRepository,
)

const ImageController = {
  getImages: async (request: FastifyRequest, reply: FastifyReply) => {
    const { ok, message, payload } = await ImageService.getImages()

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  getImage: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        id: z.string().nonempty('Id is required on url params'),
      })
      .strict()

    const { ok: okParse, payload: payloadParse } = handleZodParse(
      request.params as object,
      paramsSchema,
    )

    if (!okParse) {
      reply.status(400).send(payloadParse)
      return
    }

    const { id } = payloadParse

    const { ok, message, payload } = await ImageService.getImage(id)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
  // TODO: this must receive a image file, upload to dropbox, get url and save on db
  createImage: async (request: FastifyRequest, reply: FastifyReply) => {
    const bodySchema = z
      .object({
        userId: z.string().nonempty('User id is required'),
        url: z
          .string()
          .nonempty('Url is required')
          .url('Url must be a valid url'),
      })
      .strict()

    const { ok: okParse, payload: payloadParse } = handleZodParse(
      request.body as object,
      bodySchema,
    )

    if (!okParse) {
      reply.status(400).send(payloadParse)
      return
    }

    const image = payloadParse

    const { ok, message, payload } = await ImageService.createImage(image)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(201).send({ message, payload })
  },
  deleteImage: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        id: z.string().nonempty('Id is required on url params'),
      })
      .strict()

    const { ok: okParse, payload: payloadParse } = handleZodParse(
      request.params as object,
      paramsSchema,
    )

    if (!okParse) {
      reply.status(400).send(payloadParse)
      return
    }

    const { id } = payloadParse

    const { ok, message } = await ImageService.deleteImage(id)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message })
  },
  getUserImages: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        id: z.string().nonempty('Id is required on url params'),
      })
      .strict()

    const { ok: okParse, payload: payloadParse } = handleZodParse(
      request.params as object,
      paramsSchema,
    )

    if (!okParse) {
      reply.status(400).send(payloadParse)
      return
    }

    const { id } = payloadParse

    const { ok, message, payload } = await ImageService.getUserImages(id)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
  },
}

export { ImageController }
