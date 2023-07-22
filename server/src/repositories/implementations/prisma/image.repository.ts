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

    return image || undefined
  },
  getImages: async () => {
    const images = await prisma.image.findMany()

    return images
  },
  getUserImages: async (userId: string) => {
    const userImages = await prisma.image.findMany({
      where: {
        userId,
      },
    })

    return userImages
  },
  createImage: async (image: CreateImageDTO) => {
    const imageCreated = await prisma.image.create({
      data: {
        url: image.url,
        userId: image.userId,
      },
    })

    return imageCreated
  },
  deleteImage: async (id: string) => {
    const deleted = await prisma.image.delete({
      where: {
        id,
      },
    })

    return deleted
  },
}

const clearImagesPrisma = async () => {
  await prisma.image.deleteMany()
}

export { PrismaImageRepository, clearImagesPrisma }
