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
    const queryParamsSchema = z
      .object({
        take: z.number().int().nonnegative().optional(),
        skip: z.number().int().nonnegative().optional(),
      })
      .strict()

    const { ok: okParse, payload: payloadParse } = handleZodParse(
      request.query as object,
      queryParamsSchema,
    )

    if (!okParse) {
      reply.status(400).send(payloadParse)
      return
    }

    const { take, skip } = payloadParse

    const { ok, message, payload } = await ImageService.getImages(take, skip)

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    return reply.status(200).send({ message, payload })
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
  updateImage: async (request: FastifyRequest, reply: FastifyReply) => {
    const paramsSchema = z
      .object({
        id: z.string().nonempty('Id is required on url params'),
      })
      .strict()

    const bodySchema = z
      .object({
        filter: z.string(),
      })
      .strict()

    const { ok: okParseParams, payload: payloadParseParams } = handleZodParse(
      request.params as object,
      paramsSchema,
    )

    const { ok: okParseBody, payload: payloadParseBody } = handleZodParse(
      request.body as object,
      bodySchema,
    )

    if (!okParseParams) {
      reply.status(400).send(payloadParseParams)
      return
    }

    if (!okParseBody) {
      reply.status(400).send(payloadParseBody)
      return
    }

    const { id } = payloadParseParams
    const { filter } = payloadParseBody

    const { ok, message, payload } = await ImageService.updateImage(id, {
      filter,
    })

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    reply.status(200).send({ message, payload })
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
    const queryParamsSchema = z
      .object({
        take: z.number().int().nonnegative().optional(),
        skip: z.number().int().nonnegative().optional(),
      })
      .strict()

    const paramsSchema = z
      .object({
        id: z.string().nonempty('User id is required on url params'),
      })
      .strict()

    const { ok: okParseQueryParams, payload: payloadParseQueryParams } =
      handleZodParse(request.query as object, queryParamsSchema)

    const { ok: okParseParams, payload: payloadParseParams } = handleZodParse(
      request.params as object,
      paramsSchema,
    )

    if (!okParseQueryParams) {
      reply.status(400).send(payloadParseQueryParams)
      return
    }

    if (!okParseParams) {
      reply.status(400).send(payloadParseParams)
      return
    }

    const { take, skip } = payloadParseQueryParams
    const { id } = payloadParseParams

    const { ok, message, payload } = await ImageService.getUserImages(
      id,
      take,
      skip,
    )

    if (!ok) {
      reply.status(400).send({ message })
      return
    }

    return reply.status(200).send({ message, payload })
  },
}

export { ImageController }
