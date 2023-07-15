import { CreateImageDTO } from '../../../dtos/image/create-image.dto'
import { prisma } from '../../../lib/prisma'
import { IImageRepository } from '../../iimage.repository'

const PrismaImageRepository: IImageRepository = {
  getImage: async (id: string) => {
    const image = await prisma.image.findUnique({
      where: {
        id,
      },
    })

    if (!image) {
      return {
        ok: false,
        message: `Image #${id} not found`,
        payload: undefined,
      }
    }

    return {
      ok: true,
      message: 'Image found successfully',
      payload: image,
    }
  },
  getImages: async () => {
    const images = await prisma.image.findMany()

    return {
      ok: true,
      message: 'Images found successfully',
      payload: images,
    }
  },
  createImage: async (image: CreateImageDTO) => {
    const imageCreated = await prisma.image.create({
      data: {
        url: image.url,
        userId: image.userId,
      },
    })

    return {
      ok: true,
      message: 'Image created successfully',
      payload: imageCreated,
    }
  },
  deleteImage: async (id: string) => {
    const image = await prisma.image.findUnique({
      where: {
        id,
      },
    })

    if (!image) {
      return {
        ok: false,
        message: `Image #${id} not found`,
        payload: undefined,
      }
    }

    await prisma.image.delete({
      where: {
        id,
      },
    })

    return {
      ok: true,
      message: 'Image deleted successfully',
      payload: undefined,
    }
  },
}

const clearImagesPrisma = async () => {
  await prisma.image.deleteMany()
}

export { PrismaImageRepository, clearImagesPrisma }
