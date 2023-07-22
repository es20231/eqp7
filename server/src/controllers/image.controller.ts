import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { instantiatedImageService } from '../factories/image.factory'
import { MemoryImageRepository } from '../repositories/implementations/memory/image.repository'
import { MemoryUserRepository } from '../repositories/implementations/memory/user.repository'
import { DropboxUploadImageService } from '../services/upload-image.service'
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
    const fileReceived = await request.file()
    // const fileBackup = fileReceived ? { ...fileReceived } : undefined

    if (!fileReceived) {
      return reply.status(400).send({ message: 'File is required' })
    }

    // try {
    //   await fileBackup.toBuffer()
    // } catch (err) {
    //   console.log('error truncate', err)
    //   return reply.status(400).send({
    //     message:
    //       'Maximum file size exceeded. File must contain a maximum of 10 mb',
    //   })
    // }

    console.log('fileee', fileReceived)

    const { filename, file, fields } = fileReceived

    const userIdObject = {
      userId: fields.userId?.value || undefined,
      fieldname: fields.userId?.fieldname || undefined,
    }

    const userIdSchema = z.object({
      userId: z.string().nonempty('User id is required'),
      fieldname: z.string().nonempty('Fieldname is required to be: userId'),
    })

    const { ok: okParseUserId, payload: payloadParseUserId } = handleZodParse(
      userIdObject,
      userIdSchema,
    )

    if (!okParseUserId) return reply.status(400).send(payloadParseUserId)

    const fileObject = {
      filename,
      fieldname: fields.file ? 'file' : undefined,
      file,
      size: fileReceived.file.bytesRead,
    }

    const fileSchema = z.object({
      filename: z
        .string()
        .nonempty('Filename is required')
        .regex(
          /\.(jpg|jpeg|png)$/i,
          'File must be an image on format jpg, jpeg or png',
        ),
      fieldname: z.string().regex(/file/, 'Fieldname must be file'),
      file: z.any(),
      size: z.number().max(1024 * 1024 * 10, 'File must be less than 10MB'),
    })

    const { ok: okParseFile, payload: payloadParseFile } = handleZodParse(
      fileObject,
      fileSchema,
    )

    if (!okParseFile) {
      reply.status(400).send(payloadParseFile)
      return
    }

    const {
      ok: okUpload,
      message: messageUpload,
      payload: payloadUpload,
    } = await DropboxUploadImageService.upload(
      payloadParseFile.file,
      payloadParseFile.filename,
    )

    if (!okUpload || !payloadUpload) {
      return reply.status(400).send({ message: messageUpload })
    }

    const image = {
      userId: payloadParseUserId.userId,
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
