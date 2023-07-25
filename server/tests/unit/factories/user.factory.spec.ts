import { instantiatedUserService } from '../../../src/factories/user.factory'
import { MemoryImageRepository } from '../../../src/repositories/implementations/memory/image.repository'
import { MemoryPostRepository } from '../../../src/repositories/implementations/memory/post.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'

describe('User Factory', () => {
  const service = instantiatedUserService(
    MemoryUserRepository,
    MemoryImageRepository,
    MemoryPostRepository,
  )
  it('should be defined', () => {
    expect(service).toBeTruthy()
  })

  it('should be all methods defined', () => {
    expect(service.getUsers).toBeDefined()
    expect(service.getUserById).toBeDefined()
    expect(service.getUserByUsername).toBeDefined()
    expect(service.getUserByEmail).toBeDefined()
    expect(service.createUser).toBeDefined()
    expect(service.updateUser).toBeDefined()
    expect(service.deleteUser).toBeDefined()
    expect(service.getUserImages).toBeDefined()
    expect(service.getUserPosts).toBeDefined()
  })
})
