import { CreateImageDTO } from '../dtos/image/create-image.dto'
import { Image } from '../entities/image.entity'
import { IImageRepository } from '../repositories/iimage.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { ServiceResult } from './result'

interface IImageService {
  getImages: () => Promise<ServiceResult<Image[]>>
  getImage: (id: string) => Promise<ServiceResult<Image>>
  createImage: (image: CreateImageDTO) => Promise<ServiceResult<Image>>
  deleteImage: (id: string) => Promise<ServiceResult<void>>
  getUserImages: (userId: string) => Promise<ServiceResult<Image[]>>
}

const ImageService = (
  imageRepository: IImageRepository,
  userRepository: IUserRepository,
): IImageService => ({
  getImages: async (): Promise<ServiceResult<Image[]>> => {
    const images = await imageRepository.getImages()
    return {
      ok: true,
      message: 'Images found successfully',
      payload: images,
    }
  },
  getImage: async (id: string): Promise<ServiceResult<Image>> => {
    const image = await imageRepository.getImage(id)

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
  createImage: async (image: CreateImageDTO): Promise<ServiceResult<Image>> => {
    const user = await userRepository.getUserById(image.userId)

    if (!user) {
      return {
        ok: false,
        message: `User #${image.userId} not found`,
        payload: undefined,
      }
    }

    const created = await imageRepository.createImage(image)

    return {
      ok: true,
      message: 'Image created successfully',
      payload: created,
    }
  },
  deleteImage: async (id: string) => {
    const image = await imageRepository.getImage(id)

    if (!image) {
      return {
        ok: false,
        message: `Image #${id} not found`,
        payload: undefined,
      }
    }

    await imageRepository.deleteImage(id)

    return {
      ok: true,
      message: 'Image deleted successfully',
      payload: undefined,
    }
  },
  getUserImages: async (userId: string) => {
    const user = await userRepository.getUserById(userId)

    if (!user) {
      return {
        ok: false,
        message: `User #${userId} not found`,
        payload: undefined,
      }
    }

    const images = await imageRepository.getUserImages(userId)

    return {
      ok: true,
      message: 'Images found successfully',
      payload: images,
    }
  },
})

export { IImageService, ImageService }
