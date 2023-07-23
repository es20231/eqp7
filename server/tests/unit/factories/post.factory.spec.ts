import { instantiatedPostService } from '../../../src/factories/post.factory'
import { MemoryImageRepository } from '../../../src/repositories/implementations/memory/image.repository'
import { MemoryPostRepository } from '../../../src/repositories/implementations/memory/post.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'

describe('Post Factory', () => {
  const service = instantiatedPostService(
    MemoryPostRepository,
    MemoryUserRepository,
    MemoryImageRepository,
  )
  it('should to be defined', () => {
    expect(service).toBeDefined()
  })

  it('should to be all methods defined', () => {
    expect(service.getPosts).toBeDefined()
    expect(service.getPostById).toBeDefined()
    expect(service.getPostsByUserId).toBeDefined()
    expect(service.createPost).toBeDefined()
    expect(service.updatePost).toBeDefined()
    expect(service.deletePost).toBeDefined()
  })
})
