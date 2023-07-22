import { instantiatedImageService } from '../../../src/factories/image.factory'
import { MemoryImageRepository } from '../../../src/repositories/implementations/memory/image.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'

describe('Image Factory', () => {
  const service = instantiatedImageService(
    MemoryImageRepository,
    MemoryUserRepository,
  )
  it('should be defined', () => {
    expect(service).toBeTruthy()
  })

  it('should be all methods defined', () => {
    expect(service.getImages).toBeDefined()
    expect(service.getImage).toBeDefined()
    expect(service.createImage).toBeDefined()
    expect(service.deleteImage).toBeDefined()
  })
})
