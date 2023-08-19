import { CreateImageDTO } from '../dtos/image/create-image.dto'
import { UpdateImageDTO } from '../dtos/image/update-image.dto'
import { Image } from '../entities/image.entity'

interface IImageRepository {
  getImage: (id: string) => Promise<Image | undefined>
  getImages: (take?: number, skip?: number) => Promise<Image[]>
  getUserImages: (
    userId: string,
    take?: number,
    skip?: number,
  ) => Promise<Image[]>
  createImage: (image: CreateImageDTO) => Promise<Image>
  updateImage: (id: string, image: UpdateImageDTO) => Promise<Image>
  deleteImage: (id: string) => Promise<Image>
}

export { IImageRepository }
