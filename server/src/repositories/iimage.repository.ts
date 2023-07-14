import { CreateImageDTO } from '../dtos/image/create-image.dto'
import { Image } from '../entities/image.entity'
import { RepositoryResult } from './result'

interface IImageRepository {
  getImage: (id: string) => Promise<RepositoryResult<Image>>
  getImages: () => Promise<RepositoryResult<Image[]>>
  createImage: (image: CreateImageDTO) => Promise<RepositoryResult<Image>>
  deleteImage: (id: string) => Promise<RepositoryResult<Image>>
}

export { IImageRepository }
