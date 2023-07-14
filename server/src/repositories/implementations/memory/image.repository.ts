import { CreateImageDTO } from '../../../dtos/image/create-image.dto'
import { Image } from '../../../entities/image.entity'
import { delay, generateRandomId } from '../../../utils'
import { IImageRepository } from '../../iimage.repository'

const images = [] as Image[]
const MemoryImageRepository: IImageRepository = {
  getImage: async (id: string) => {
    await delay()
    const image = images.find((image) => image.id === id)
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
    await delay()
    return {
      ok: true,
      message: 'Images found successfully',
      payload: images,
    }
  },
  createImage: async (image: CreateImageDTO) => {
    await delay()
    const newImage = {
      ...image,
      id: generateRandomId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Image
    images.push(newImage)
    return {
      ok: true,
      message: 'Image created successfully',
      payload: newImage,
    }
  },
  deleteImage: async (id: string) => {
    await delay()
    const imageIndex = images.findIndex((image) => image.id === id)
    if (imageIndex < 0) {
      return {
        ok: false,
        message: `Image #${id} not found`,
        payload: undefined,
      }
    }
    images.splice(imageIndex, 1)
    return {
      ok: true,
      message: 'Image deleted successfully',
      payload: undefined,
    }
  },
}

const clear = async () => {
  await delay()
  images.splice(0, images.length)
}

export { MemoryImageRepository, clear }
