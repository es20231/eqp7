import { CreateActivateTokenDTO } from '../../../src/dtos/activate-token/create-activate-token.dto'
import { instantiatedActivateTokenService } from '../../../src/factories/activate-token.factory'
import { prisma } from '../../../src/lib/prisma'
import {
  MemoryActivateTokenRepository,
  clearMemoryActivateToken,
} from '../../../src/repositories/implementations/memory/activate-token.repository'
import {
  MemoryUserRepository,
  clearUserMemory,
} from '../../../src/repositories/implementations/memory/user.repository'
import {
  PrismaActivateTokenRepository,
  clearPrismaActivateToken,
} from '../../../src/repositories/implementations/prisma/activate-token.repository'
import {
  PrismaUserRepository,
  clearUsersPrisma,
} from '../../../src/repositories/implementations/prisma/user.repository'

describe('MemoryActivateTokenService', () => {
  const service = instantiatedActivateTokenService(
    MemoryActivateTokenRepository,
    MemoryUserRepository,
  )

  let userId: string

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  beforeAll(async () => {
    await clearMemoryActivateToken()
    await clearUserMemory()

    const user = await MemoryUserRepository.createUser({
      fullName: 'Test User',
      email: 'test@mail.com',
      password: 'password',
      username: 'test',
    })

    userId = user.id
  })

  afterEach(async () => {
    await clearMemoryActivateToken()
  })

  describe('create', () => {
    it('should create a new activate token', async () => {
      const activeToken: CreateActivateTokenDTO = {
        token: 'token',
        userId,
      }

      const { ok, message, payload } = await service.create(activeToken)

      expect(ok).toBe(true)
      expect(message).toBe('Activate token created successfully')
      expect(payload).toBeDefined()
      expect(payload).toMatchObject({
        ...activeToken,
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not create a new activate token if user does not exist', async () => {
      const activeToken: CreateActivateTokenDTO = {
        token: 'token',
        userId: 'invalid-user-id',
      }

      const { ok, message, payload } = await service.create(activeToken)

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBeUndefined()
    })

    it('should not create a new activate token if token already exists', async () => {
      const activeToken: CreateActivateTokenDTO = {
        token: 'token',
        userId,
      }

      await service.create(activeToken)

      const { ok, message, payload } = await service.create(activeToken)

      expect(ok).toBe(false)
      expect(message).toBe('Activate token already exists')
      expect(payload).toBeUndefined()
    })
  })

  describe('get', () => {
    it('should get an activate token by id', async () => {
      const activeToken: CreateActivateTokenDTO = {
        token: 'token',
        userId,
      }

      const { payload } = await service.create(activeToken)

      if (!payload) throw new Error('token not created')

      const {
        ok,
        message,
        payload: activateToken,
      } = await service.getById(payload.id)

      expect(ok).toBe(true)
      expect(message).toBe('Activate token found successfully')
      expect(activateToken).toBeDefined()
      expect(activateToken).toMatchObject({
        ...activeToken,
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not get an activate token if it does not exist', async () => {
      const { ok, message, payload } = await service.getById('invalid-id')

      expect(ok).toBe(false)
      expect(message).toBe('Activate token not found')
      expect(payload).toBeUndefined()
    })

    it('should get an activate token by token', async () => {
      const activeToken: CreateActivateTokenDTO = {
        token: 'token',
        userId,
      }

      const { payload } = await service.create(activeToken)

      if (!payload) throw new Error('token not created')

      const {
        ok,
        message,
        payload: activateToken,
      } = await service.getByToken(payload.token)

      expect(ok).toBe(true)
      expect(message).toBe('Activate token found successfully')
      expect(activateToken).toBeDefined()
      expect(activateToken).toMatchObject({
        ...activeToken,
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not get an activate token if it does not exist', async () => {
      const { ok, message, payload } = await service.getByToken('invalid-token')

      expect(ok).toBe(false)
      expect(message).toBe('Activate token not found')
      expect(payload).toBeUndefined()
    })
  })

  describe('update', () => {
    it('should update an activate token', async () => {
      const activeToken: CreateActivateTokenDTO = {
        token: 'token',
        userId,
      }

      const { payload } = await service.create(activeToken)

      if (!payload) throw new Error('token not created')

      const updateActiveToken = {
        token: 'new-token',
      }

      const {
        ok,
        message,
        payload: updatedActivateToken,
      } = await service.update(payload.id, updateActiveToken)

      expect(ok).toBe(true)
      expect(message).toBe('Activate token updated successfully')
      expect(updatedActivateToken).toBeDefined()
      expect(updatedActivateToken).toMatchObject({
        ...activeToken,
        ...updateActiveToken,
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not update an activate token if it does not exist', async () => {
      const updateActiveToken = {
        token: 'new-token',
      }

      const { ok, message, payload } = await service.update(
        'invalid-id',
        updateActiveToken,
      )

      expect(ok).toBe(false)
      expect(message).toBe('Activate token not found')
      expect(payload).toBeUndefined()
    })
  })

  describe('delete', () => {
    it('should delete an activate token', async () => {
      const activeToken: CreateActivateTokenDTO = {
        token: 'token',
        userId,
      }

      const { payload } = await service.create(activeToken)

      if (!payload) throw new Error('token not created')

      const {
        ok,
        message,
        payload: deletedActivateToken,
      } = await service.delete(payload.id)

      expect(ok).toBe(true)
      expect(message).toBe('Activate token deleted successfully')
      expect(deletedActivateToken).toBeUndefined()

      const {
        ok: okFound,
        message: messageFound,
        payload: payloadFound,
      } = await service.getById(payload.id)

      expect(okFound).toBe(false)
      expect(messageFound).toBe('Activate token not found')
      expect(payloadFound).toBeUndefined()
    })

    it('should not delete an activate token if it does not exist', async () => {
      const { ok, message, payload } = await service.delete('invalid-id')

      expect(ok).toBe(false)
      expect(message).toBe('Activate token not found')
      expect(payload).toBeUndefined()
    })
  })
})

describe('PrismaActivateTokenService', () => {
  const service = instantiatedActivateTokenService(
    PrismaActivateTokenRepository,
    PrismaUserRepository,
  )

  let userId: string

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  beforeAll(async () => {
    await clearPrismaActivateToken()
    await clearUsersPrisma()

    const user = await prisma.user.create({
      data: {
        fullName: 'Test User',
        email: 'test@mail.com',
        password: 'password',
        username: 'test',
      },
    })

    userId = user.id
  })

  afterEach(async () => {
    await clearPrismaActivateToken()
  })

  describe('create', () => {
    it('should create a new activate token', async () => {
      const activeToken: CreateActivateTokenDTO = {
        token: 'token',
        userId,
      }

      const { ok, message, payload } = await service.create(activeToken)

      expect(ok).toBe(true)
      expect(message).toBe('Activate token created successfully')
      expect(payload).toBeDefined()
      expect(payload).toMatchObject({
        ...activeToken,
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not create a new activate token if user does not exist', async () => {
      const activeToken: CreateActivateTokenDTO = {
        token: 'token',
        userId: 'invalid-user-id',
      }

      const { ok, message, payload } = await service.create(activeToken)

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBeUndefined()
    })

    it('should not create a new activate token if token already exists', async () => {
      const activeToken: CreateActivateTokenDTO = {
        token: 'token',
        userId,
      }

      await service.create(activeToken)

      const { ok, message, payload } = await service.create(activeToken)

      expect(ok).toBe(false)
      expect(message).toBe('Activate token already exists')
      expect(payload).toBeUndefined()
    })
  })

  describe('get', () => {
    it('should get an activate token by id', async () => {
      const activeToken: CreateActivateTokenDTO = {
        token: 'token',
        userId,
      }

      const { payload } = await service.create(activeToken)

      if (!payload) throw new Error('token not created')

      const {
        ok,
        message,
        payload: activateToken,
      } = await service.getById(payload.id)

      expect(ok).toBe(true)
      expect(message).toBe('Activate token found successfully')
      expect(activateToken).toBeDefined()
      expect(activateToken).toMatchObject({
        ...activeToken,
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not get an activate token if it does not exist', async () => {
      const { ok, message, payload } = await service.getById('invalid-id')

      expect(ok).toBe(false)
      expect(message).toBe('Activate token not found')
      expect(payload).toBeUndefined()
    })

    it('should get an activate token by token', async () => {
      const activeToken: CreateActivateTokenDTO = {
        token: 'token',
        userId,
      }

      const { payload } = await service.create(activeToken)

      if (!payload) throw new Error('token not created')

      const {
        ok,
        message,
        payload: activateToken,
      } = await service.getByToken(payload.token)

      expect(ok).toBe(true)
      expect(message).toBe('Activate token found successfully')
      expect(activateToken).toBeDefined()
      expect(activateToken).toMatchObject({
        ...activeToken,
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not get an activate token if it does not exist', async () => {
      const { ok, message, payload } = await service.getByToken('invalid-token')

      expect(ok).toBe(false)
      expect(message).toBe('Activate token not found')
      expect(payload).toBeUndefined()
    })
  })

  describe('update', () => {
    it('should update an activate token', async () => {
      const activeToken: CreateActivateTokenDTO = {
        token: 'token',
        userId,
      }

      const { payload } = await service.create(activeToken)

      if (!payload) throw new Error('token not created')

      const updateActiveToken = {
        token: 'new-token',
      }

      const {
        ok,
        message,
        payload: updatedActivateToken,
      } = await service.update(payload.id, updateActiveToken)

      expect(ok).toBe(true)
      expect(message).toBe('Activate token updated successfully')
      expect(updatedActivateToken).toBeDefined()
      expect(updatedActivateToken).toMatchObject({
        ...activeToken,
        ...updateActiveToken,
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not update an activate token if it does not exist', async () => {
      const updateActiveToken = {
        token: 'new-token',
      }

      const { ok, message, payload } = await service.update(
        'invalid-id',
        updateActiveToken,
      )

      expect(ok).toBe(false)
      expect(message).toBe('Activate token not found')
      expect(payload).toBeUndefined()
    })
  })

  describe('delete', () => {
    it('should delete an activate token', async () => {
      const activeToken: CreateActivateTokenDTO = {
        token: 'token',
        userId,
      }

      const { payload } = await service.create(activeToken)

      if (!payload) throw new Error('token not created')

      const {
        ok,
        message,
        payload: deletedActivateToken,
      } = await service.delete(payload.id)

      expect(ok).toBe(true)
      expect(message).toBe('Activate token deleted successfully')
      expect(deletedActivateToken).toBeUndefined()

      const {
        ok: okFound,
        message: messageFound,
        payload: payloadFound,
      } = await service.getById(payload.id)

      expect(okFound).toBe(false)
      expect(messageFound).toBe('Activate token not found')
      expect(payloadFound).toBeUndefined()
    })

    it('should not delete an activate token if it does not exist', async () => {
      const { ok, message, payload } = await service.delete('invalid-id')

      expect(ok).toBe(false)
      expect(message).toBe('Activate token not found')
      expect(payload).toBeUndefined()
    })
  })
})
