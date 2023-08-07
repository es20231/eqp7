import { CreateActivateTokenDTO } from '../../../../src/dtos/activate-token/create-activate-token.dto'
import { prisma } from '../../../../src/lib/prisma'
import {
  PrismaActivateTokenRepository,
  clearPrismaActivateToken,
} from '../../../../src/repositories/implementations/prisma/activate-token.repository'

describe('PrismaActivateTokenRepository', () => {
  const repository = PrismaActivateTokenRepository
  let userId: string

  it('should be defined', () => {
    expect(repository).toBeTruthy()
  })

  beforeAll(async () => {
    await clearPrismaActivateToken()
    await prisma.user.deleteMany()

    const user = await prisma.user.create({
      data: {
        email: 'test@mail.com',
        password: 'password',
        username: 'user',
        fullName: 'Test tested',
      },
    })

    userId = user.id
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
  })

  afterEach(async () => {
    await clearPrismaActivateToken()
  })

  describe('create', () => {
    it('should create a new activate token', async () => {
      const activateToken: CreateActivateTokenDTO = {
        token: 'abc123',
        userId,
      }

      const createdActivateToken = await repository.create(activateToken)

      expect(createdActivateToken).toMatchObject({
        ...activateToken,
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should throw an error if activate token already exists', async () => {
      const activateToken: CreateActivateTokenDTO = {
        token: 'abc123',
        userId,
      }

      await repository.create(activateToken)

      await expect(repository.create(activateToken)).rejects.toThrow()
    })
  })

  describe('getById', () => {
    it('should return the activate token with the given id', async () => {
      const activateToken: CreateActivateTokenDTO = {
        token: 'abc123',
        userId,
      }

      const createdActivateToken = await repository.create(activateToken)

      const foundActivateToken = await repository.getById(
        createdActivateToken.id,
      )

      expect(foundActivateToken).toEqual(createdActivateToken)
    })

    it('should return undefined if activate token with given id does not exist', async () => {
      const foundActivateToken = await repository.getById('nonexistent-id')

      expect(foundActivateToken).toBeUndefined()
    })
  })

  describe('getByToken', () => {
    it('should return the activate token with the given token', async () => {
      const activateToken: CreateActivateTokenDTO = {
        token: 'abc123',
        userId,
      }

      const createdActivateToken = await repository.create(activateToken)

      const foundActivateToken = await repository.getByToken(
        createdActivateToken.token,
      )

      expect(foundActivateToken).toEqual(createdActivateToken)
    })

    it('should return undefined if activate token with given token does not exist', async () => {
      const foundActivateToken = await repository.getByToken(
        'nonexistent-token',
      )

      expect(foundActivateToken).toBeUndefined()
    })
  })

  describe('update', () => {
    it('should update the activate token with the given id', async () => {
      const activateToken: CreateActivateTokenDTO = {
        token: 'abc123',
        userId,
      }

      const createdActivateToken = await repository.create(activateToken)

      const updatedActivateToken = await repository.update(
        createdActivateToken.id,
        {
          token: 'new-token',
        },
      )

      expect(updatedActivateToken).toStrictEqual({
        ...createdActivateToken,
        token: 'new-token',
        updatedAt: expect.any(Date),
      })
    })

    it('should throw an error if activate token with given id does not exist', async () => {
      await expect(
        repository.update('nonexistent-id', {
          token: 'new-token',
        }),
      ).rejects.toThrow()
    })
  })

  describe('delete', () => {
    it('should delete the activate token with the given id', async () => {
      const activateToken: CreateActivateTokenDTO = {
        token: 'abc123',
        userId,
      }

      const createdActivateToken = await repository.create(activateToken)

      await repository.delete(createdActivateToken.id)

      const foundActivateToken = await repository.getById(
        createdActivateToken.id,
      )

      expect(foundActivateToken).toBeUndefined()
    })

    it('should throw an error if activate token with given id does not exist', async () => {
      await expect(repository.delete('nonexistent-id')).rejects.toThrow()
    })
  })
})
