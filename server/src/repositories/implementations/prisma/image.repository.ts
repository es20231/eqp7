import { CreateImageDTO } from '../../../dtos/image/create-image.dto'
import { UpdateImageDTO } from '../../../dtos/image/update-image.dto'
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

    return image
      ? {
          ...image,
          filter: image.filter || undefined,
        }
      : undefined
  },
  getImages: async (take?: number, skip?: number) => {
    const images = await prisma.image.findMany({
      where: {
        deleted: false,
      },
      take,
      skip,
    })

    return images.map((image) => ({
      ...image,
      filter: image.filter || undefined,
    }))
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

    return userImages.map((image) => ({
      ...image,
      filter: image.filter || undefined,
    }))
  },
  createImage: async (image: CreateImageDTO) => {
    const imageCreated = await prisma.image.create({
      data: {
        url: image.url,
        userId: image.userId,
      },
    })

    return {
      ...imageCreated,
      filter: imageCreated.filter || undefined,
    }
  },
  updateImage: async (id: string, image: UpdateImageDTO) => {
    const imageUpdated = await prisma.image.update({
      where: {
        id,
      },
      data: {
        filter: image.filter,
      },
    })

    return {
      ...imageUpdated,
      filter: imageUpdated.filter || undefined,
    }
  },
  deleteImage: async (id: string) => {
    const softDelete = await prisma.image.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
      include: {
        posts: true,
      },
    })

    return { ...softDelete, filter: softDelete.filter || undefined }
  },
}

const clearImagesPrisma = async () => {
  await prisma.image.deleteMany()
}

export { PrismaImageRepository, clearImagesPrisma }
