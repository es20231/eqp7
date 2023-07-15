import { CreateImageDTO } from '../dtos/image/create-image.dto'
import { Image } from '../entities/image.entity'

interface IImageRepository {
  getImage: (id: string) => Promise<Image | undefined>
  getImages: () => Promise<Image[]>
  createImage: (image: CreateImageDTO) => Promise<Image | undefined>
  deleteImage: (id: string) => Promise<Image | undefined>
}

export { IImageRepository }
