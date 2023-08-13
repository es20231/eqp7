import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { instantiatedImageService } from '../factories/image.factory'
import { PrismaImageRepository } from '../repositories/implementations/prisma/image.repository'
import { PrismaUserRepository } from '../repositories/implementations/prisma/user.repository'
import { DropboxUploadImageService } from '../services/upload-image.service'
import { handleZodParse } from '../utils'

// const ImageService = instantiatedImageService(
//   MemoryImageRepository,
//   MemoryUserRepository,
// )

const ImageService = instantiatedImageService(
  PrismaImageRepository,
  PrismaUserRepository,
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
  createImage: async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as unknown as {
      userId: { value: string }
      file: { filename: string; toBuffer: () => Promise<Buffer> }
    }

    const file = await body.file.toBuffer()

    const bodyObject = {
      userId: body.userId.value,
      file,
      filename: body.file.filename,
    }

    console.log('bodyObj', bodyObject)

    const bodySchema = z
      .object({
        userId: z.string().nonempty('UserId is required on body'),
        filename: z.string().nonempty('Filename is required on body'),
        file: z.any(),
      })
      .strict()

    const { ok: okParse, payload: payloadParse } = handleZodParse(
      bodyObject,
      bodySchema,
    )

    if (!okParse) {
      reply.status(400).send(payloadParse)
      return
    }

    const {
      ok: okUpload,
      message: messageUpload,
      payload: payloadUpload,
    } = await DropboxUploadImageService.upload(
      payloadParse.file,
      payloadParse.filename,
    )

    if (!okUpload || !payloadUpload) {
      return reply.status(400).send({ message: messageUpload })
    }

    const image = {
      userId: payloadParse.userId,
      url: payloadUpload.url,
    }

    const { ok, message, payload } = await ImageService.createImage(image)

    if (!ok) {
      await DropboxUploadImageService.delete(payloadUpload.deleteInfo)
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
