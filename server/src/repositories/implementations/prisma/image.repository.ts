import { CreateImageDTO } from '../../../dtos/image/create-image.dto'
import { prisma } from '../../../lib/prisma'
import { IImageRepository } from '../../iimage.repository'

const PrismaImageRepository: IImageRepository = {
  getImage: async (id: string) => {
    const image = await prisma.image.findUnique({
      where: {
        id,
        deleted: false,
      },
    })

    return image || undefined
  },
  getImages: async (take?: number, skip?: number) => {
    const images = await prisma.image.findMany({
      where: {
        deleted: false,
      },
      take,
      skip,
    })

    return images
  },
  getUserImages: async (userId: string, take?: number, skip?: number) => {
    const userImages = await prisma.image.findMany({
      where: {
        userId,
        deleted: false,
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
    const softDelete = await prisma.image.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    })

    return softDelete
  },
}

const clearImagesPrisma = async () => {
  await prisma.image.deleteMany()
}

export { PrismaImageRepository, clearImagesPrisma }
