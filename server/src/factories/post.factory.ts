import { IImageRepository } from '../repositories/iimage.repository'
import { IPostRepository } from '../repositories/ipost.repository'
import { IUserRepository } from '../repositories/iuser.repository'
import { IPostService, PostService } from '../services/post.service'

const instatiatedPostService = (
  postRepository: IPostRepository,
  userRepository: IUserRepository,
  imageRepository: IImageRepository,
): IPostService => PostService(imageRepository, postRepository, userRepository)

export { instatiatedPostService }
