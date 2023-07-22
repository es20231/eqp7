import { instantiatedImageService } from '../../../src/factories/image.factory'
import {
  MemoryImageRepository,
  clearImageMemory,
} from '../../../src/repositories/implementations/memory/image.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'
import {
  PrismaImageRepository,
  clearImagesPrisma,
} from '../../../src/repositories/implementations/prisma/image.repository'
import { PrismaUserRepository } from '../../../src/repositories/implementations/prisma/user.repository'

describe('MemoryImageService', () => {
  const service = instantiatedImageService(
    MemoryImageRepository,
    MemoryUserRepository,
  )
  it('should be defined', () => {
    expect(service).toBeTruthy()
  })

  let userId: string

  beforeAll(async () => {
    const { id } = await MemoryUserRepository.createUser({
      username: 'user-test',
      email: 'test@mail.com',
      fullName: 'User Test',
      password: 'test',
    })

    userId = id
  })

  afterEach(async () => {
    await clearImageMemory()
  })

  describe('create', () => {
    it('should be able to create an image', async () => {
      const image = {
        url: 'https://github.com/CassianoJunior.png',
        userId,
      }

      const { ok, message, payload } = await service.createImage(image)

      expect(ok).toBe(true)
      expect(message).toBe('Image created successfully')
      expect(payload).toStrictEqual({
        id: expect.any(String),
        url: image.url,
        userId: image.userId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not be able to create an image with an invalid user id', async () => {
      const image = {
        url: 'https://github.com/CassianoJunior.png',
        userId: 'non-existent',
      }

      const { ok, message, payload } = await service.createImage(image)

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBe(undefined)
    })
  })

  describe('get', () => {
    it('should be able to get all images', async () => {
      const image = {
        url: 'https://github.com/CassianoJunior.png',
        userId,
      }

      const image2 = {
        url: 'https://github.com/CassianoJunior.png',
        userId,
      }

      await service.createImage(image)
      await service.createImage(image2)

      const { ok, message, payload } = await service.getImages()

      expect(ok).toBe(true)
      expect(message).toBe('Images found successfully')
      expect(payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            url: image.url,
            userId: image.userId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            url: image2.url,
            userId: image2.userId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })

    it('should be able to get an image by id', async () => {
      const image = {
        url: 'https://github.com/CassianoJunior.png',
        userId,
      }

      const created = await service.createImage(image)

      if (!created.payload) throw new Error('Image not created')

      const { id } = created.payload

      const { ok, message, payload } = await service.getImage(id)

      expect(ok).toBe(true)
      expect(message).toBe('Image found successfully')
      expect(payload).toStrictEqual({
        id,
        url: image.url,
        userId: image.userId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not be able to get an image with an non-existent id', async () => {
      const { ok, message, payload } = await service.getImage('non-existent')

      expect(ok).toBe(false)
      expect(message).toContain('Image')
      expect(message).toContain('not found')
      expect(payload).toBe(undefined)
    })

    it('should be able to get all images from an user', async () => {
      const image = {
        url: 'https://github.com/CassianoJunior.png',
        userId,
      }

      const image2 = {
        url: 'https://github.com/CassianoJunior.png',
        userId,
      }

      await service.createImage(image)
      await service.createImage(image2)

      const { ok, message, payload } = await service.getUserImages(userId)

      expect(ok).toBe(true)
      expect(message).toBe('Images found successfully')
      expect(payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            url: image.url,
            userId: image.userId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            url: image2.url,
            userId: image2.userId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })
  })

  describe('delete', () => {
    it('should be able to delete an image', async () => {
      const image = {
        url: 'https://github.com/CassianoJunior.png',
        userId,
      }

      const created = await service.createImage(image)

      if (!created.payload) throw new Error('Image not created')

      const { id } = created.payload

      const { ok, message, payload } = await service.deleteImage(id)

      expect(ok).toBe(true)
      expect(message).toBe('Image deleted successfully')
      expect(payload).toBe(undefined)

      const {
        ok: ok2,
        message: message2,
        payload: payload2,
      } = await service.getImage(id)

      expect(ok2).toBe(false)
      expect(message2).toContain('Image')
      expect(message2).toContain('not found')
      expect(payload2).toBe(undefined)
    })

    it('should not be able to delete an image with an non-existent id', async () => {
      const { ok, message, payload } = await service.deleteImage('non-existent')

      expect(ok).toBe(false)
      expect(message).toContain('Image')
      expect(message).toContain('not found')
      expect(payload).toBe(undefined)
    })
  })
})

describe('PrismaImageService', () => {
  const service = instantiatedImageService(
    PrismaImageRepository,
    PrismaUserRepository,
  )
  it('should be defined', () => {
    expect(service).toBeTruthy()
  })

  let userId: string

  beforeAll(async () => {
    const { id } = await PrismaUserRepository.createUser({
      username: 'user-test',
      email: 'test@mail.com',
      fullName: 'User Test',
      password: 'test',
    })

    userId = id
  })

  afterEach(async () => {
    await clearImagesPrisma()
  })

  describe('create', () => {
    it('should be able to create an image', async () => {
      const image = {
        url: 'https://github.com/CassianoJunior.png',
        userId,
      }

      const { ok, message, payload } = await service.createImage(image)

      expect(ok).toBe(true)
      expect(message).toBe('Image created successfully')
      expect(payload).toStrictEqual({
        id: expect.any(String),
        url: image.url,
        userId: image.userId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not be able to create an image with an invalid user id', async () => {
      const image = {
        url: 'https://github.com/CassianoJunior.png',
        userId: 'non-existent',
      }

      const { ok, message, payload } = await service.createImage(image)

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBe(undefined)
    })
  })

  describe('get', () => {
    it('should be able to get all images', async () => {
      const image = {
        url: 'https://github.com/CassianoJunior.png',
        userId,
      }

      const image2 = {
        url: 'https://github.com/CassianoJunior.png',
        userId,
      }

      await service.createImage(image)
      await service.createImage(image2)

      const { ok, message, payload } = await service.getImages()

      expect(ok).toBe(true)
      expect(message).toBe('Images found successfully')
      expect(payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            url: image.url,
            userId: image.userId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            url: image2.url,
            userId: image2.userId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })

    it('should be able to get an image by id', async () => {
      const image = {
        url: 'https://github.com/CassianoJunior.png',
        userId,
      }

      const created = await service.createImage(image)

      if (!created.payload) throw new Error('Image not created')

      const { id } = created.payload

      const { ok, message, payload } = await service.getImage(id)

      expect(ok).toBe(true)
      expect(message).toBe('Image found successfully')
      expect(payload).toStrictEqual({
        id,
        url: image.url,
        userId: image.userId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not be able to get an image with an non-existent id', async () => {
      const { ok, message, payload } = await service.getImage('non-existent')

      expect(ok).toBe(false)
      expect(message).toContain('Image')
      expect(message).toContain('not found')
      expect(payload).toBe(undefined)
    })

    it('should be able to get all images from an user', async () => {
      const image = {
        url: 'https://github.com/CassianoJunior.png',
        userId,
      }

      const image2 = {
        url: 'https://github.com/CassianoJunior.png',
        userId,
      }

      await service.createImage(image)
      await service.createImage(image2)

      const { ok, message, payload } = await service.getUserImages(userId)

      expect(ok).toBe(true)
      expect(message).toBe('Images found successfully')
      expect(payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            url: image.url,
            userId: image.userId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            url: image2.url,
            userId: image2.userId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })
  })

  describe('delete', () => {
    it('should be able to delete an image', async () => {
      const image = {
        url: 'https://github.com/CassianoJunior.png',
        userId,
      }

      const created = await service.createImage(image)

      if (!created.payload) throw new Error('Image not created')

      const { id } = created.payload

      const { ok, message, payload } = await service.deleteImage(id)

      expect(ok).toBe(true)
      expect(message).toBe('Image deleted successfully')
      expect(payload).toBe(undefined)

      const {
        ok: ok2,
        message: message2,
        payload: payload2,
      } = await service.getImage(id)

      expect(ok2).toBe(false)
      expect(message2).toContain('Image')
      expect(message2).toContain('not found')
      expect(payload2).toBe(undefined)
    })

    it('should not be able to delete an image with an non-existent id', async () => {
      const { ok, message, payload } = await service.deleteImage('non-existent')

      expect(ok).toBe(false)
      expect(message).toContain('Image')
      expect(message).toContain('not found')
      expect(payload).toBe(undefined)
    })
  })
})
