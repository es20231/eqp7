import { CreateImageDTO } from '../dtos/image/create-image.dto'
import { Image } from '../entities/image.entity'
import { IImageRepository } from '../repositories/iimage.repository'
import { ServiceResult } from './result'
import { IUserService } from './user.service'

interface IImageService {
  getImages: () => Promise<ServiceResult<Image[]>>
  getImage: (id: string) => Promise<ServiceResult<Image>>
  createImage: (image: CreateImageDTO) => Promise<ServiceResult<Image>>
  deleteImage: (id: string) => Promise<ServiceResult<void>>
  getUserImages: (userId: string) => Promise<ServiceResult<Image[]>>
}

const ImageService = (
  imageRepository: IImageRepository,
  userService: IUserService,
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
    const { ok, message } = await userService.getUserById(image.userId)

    if (!ok) {
      return {
        ok,
        message,
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
    const { ok, message } = await userService.getUserById(userId)

    if (!ok) {
      return {
        ok,
        message,
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
