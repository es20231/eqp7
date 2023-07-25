import { instantiatedActivateTokenService } from '../../../src/factories/activate-token.factory'
import { MemoryActivateTokenRepository } from '../../../src/repositories/implementations/memory/activate-token.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'

describe('Activate Token Factory', () => {
  const service = instantiatedActivateTokenService(
    MemoryActivateTokenRepository,
    MemoryUserRepository,
  )
  it('should be defined', () => {
    expect(service).toBeTruthy()
  })

  it('should be all methods defined', () => {
    expect(service.create).toBeDefined()
    expect(service.getById).toBeDefined()
    expect(service.getByToken).toBeDefined()
    expect(service.update).toBeDefined()
    expect(service.delete).toBeDefined()
  })
})
