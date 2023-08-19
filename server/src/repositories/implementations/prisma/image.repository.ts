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
  getImages: async (take?: number, skip?: number) => {
    const images = await prisma.image.findMany({
      take,
      skip,
    })

    return images
  },
  getUserImages: async (userId: string, take?: number, skip?: number) => {
    const userImages = await prisma.image.findMany({
      where: {
        userId,
      },
      take,
      skip,
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
