import { instatiatedPostService } from '../../../src/factories/post.factory'
import { prisma } from '../../../src/lib/prisma'
import { MemoryImageRepository } from '../../../src/repositories/implementations/memory/image.repository'
import {
  clearPostMemory,
  MemoryPostRepository,
} from '../../../src/repositories/implementations/memory/post.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'
import { PrismaImageRepository } from '../../../src/repositories/implementations/prisma/image.repository'
import {
  clearPostsPrisma,
  PrismaPostRepository,
} from '../../../src/repositories/implementations/prisma/post.repository'
import { PrismaUserRepository } from '../../../src/repositories/implementations/prisma/user.repository'

describe('MemoryPostService', () => {
  const service = instatiatedPostService(
    MemoryPostRepository,
    MemoryUserRepository,
    MemoryImageRepository,
  )

  it('should to be defined', () => {
    expect(service).toBeDefined()
  })

  let userId: string
  let imageId: string

  beforeAll(async () => {
    const user = await MemoryUserRepository.createUser({
      username: 'test',
      email: 'test@mail.com',
      fullName: 'User Test',
      password: '123456',
    })

    userId = user.id

    const image = await MemoryImageRepository.createImage({
      url: 'https://github.com/JoseeAugusto.png',
      userId,
    })

    imageId = image.id
  })

  afterEach(async () => {
    await clearPostMemory()
  })

  describe('create', () => {
    it('should create a post', async () => {
      const post = {
        subtitle: 'Teste',
        userId,
        imageId,
      }

      const result = await service.createPost(post)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Post created successfully')
      expect(result.payload).toStrictEqual({
        id: expect.any(String),
        subtitle: post.subtitle,
        userId: post.userId,
        imageId: post.imageId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not create a post with invalid user id', async () => {
      const post = {
        subtitle: 'Teste',
        userId: 'invalid',
        imageId,
      }

      const result = await service.createPost(post)

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('User')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })

    it('should not create a post with invalid image id', async () => {
      const post = {
        subtitle: 'Teste',
        userId,
        imageId: 'invalid',
      }

      const result = await service.createPost(post)

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('Image')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })
  })

  describe('get', () => {
    it('should be able to get all posts', async () => {
      const post = {
        subtitle: 'Teste',
        userId,
        imageId,
      }

      const post2 = {
        subtitle: 'Teste 2',
        userId,
        imageId,
      }

      await service.createPost(post)
      await service.createPost(post2)

      const result = await service.getPosts()

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Posts found successfully')
      expect(result.payload).toStrictEqual([
        {
          id: expect.any(String),
          subtitle: post.subtitle,
          userId: post.userId,
          imageId: post.imageId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          subtitle: post2.subtitle,
          userId: post2.userId,
          imageId: post2.imageId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should be able to get a post by id', async () => {
      const post = {
        subtitle: 'Teste',
        userId,
        imageId,
      }

      const created = await service.createPost(post)

      if (!created.payload) throw new Error('Post not created')

      const result = await service.getPostById(created.payload.id)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Post found successfully')
      expect(result.payload).toStrictEqual({
        id: expect.any(String),
        subtitle: post.subtitle,
        userId: post.userId,
        imageId: post.imageId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not be able to get a post by invalid id', async () => {
      const result = await service.getPostById('invalid')

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('Post')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })

    it('should be able to get all posts from a user', async () => {
      const post = {
        subtitle: 'Teste',
        userId,
        imageId,
      }

      const post2 = {
        subtitle: 'Teste 2',
        userId,
        imageId,
      }

      await service.createPost(post)
      await service.createPost(post2)

      const result = await service.getPostsByUserId(userId)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Posts found successfully')
      expect(result.payload).toStrictEqual([
        {
          id: expect.any(String),
          subtitle: post.subtitle,
          userId: post.userId,
          imageId: post.imageId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          subtitle: post2.subtitle,
          userId: post2.userId,
          imageId: post2.imageId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should not be able to get all posts from a user with invalid id', async () => {
      const result = await service.getPostsByUserId('invalid')

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('User')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })
  })

  describe('update', () => {
    it('should be able to update a post', async () => {
      const post = {
        subtitle: 'Teste',
        userId,
        imageId,
      }

      const created = await service.createPost(post)

      if (!created.payload) throw new Error('Post not created')

      const result = await service.updatePost(created.payload.id, {
        subtitle: 'Teste 2',
      })

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Post updated successfully')
      expect(result.payload).toStrictEqual({
        id: expect.any(String),
        subtitle: 'Teste 2',
        userId: post.userId,
        imageId: post.imageId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not be able to update a post with invalid id', async () => {
      const result = await service.updatePost('invalid', {
        subtitle: 'Teste 2',
      })

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('Post')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })
  })

  describe('delete', () => {
    it('should be able to delete a post', async () => {
      const post = {
        subtitle: 'Teste',
        userId,
        imageId,
      }

      const created = await service.createPost(post)

      if (!created.payload) throw new Error('Post not created')

      const result = await service.deletePost(created.payload.id)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Post deleted successfully')
      expect(result.payload).toBeUndefined()
    })

    it('should not be able to delete a post with invalid id', async () => {
      const result = await service.deletePost('invalid')

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('Post')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })
  })
})

describe('PrismaPostService', () => {
  const service = instatiatedPostService(
    PrismaPostRepository,
    PrismaUserRepository,
    PrismaImageRepository,
  )
  it('should be defined', () => {
    expect(service).toBeTruthy()
  })

  let userId: string
  let imageId: string

  beforeAll(async () => {
    const { id: userIdCreated } = await PrismaUserRepository.createUser({
      username: 'test',
      email: 'test@mail.com',
      fullName: 'Test User',
      password: '123456',
    })

    userId = userIdCreated

    const { id: imageIdCreated } = await PrismaImageRepository.createImage({
      url: 'https://github.com/JoseeAugusto.png',
      userId,
    })

    imageId = imageIdCreated
  })

  afterAll(async () => {
    await prisma.image.delete({
      where: {
        id: imageId,
      },
    })

    await prisma.user.delete({
      where: {
        id: userId,
      },
    })
  })

  afterEach(() => {
    clearPostsPrisma()
  })

  describe('create', () => {
    it('should be able to create a post', async () => {
      const post = {
        subtitle: 'Teste',
        userId,
        imageId,
      }

      const result = await service.createPost(post)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Post created successfully')
      expect(result.payload).toStrictEqual({
        id: expect.any(String),
        subtitle: post.subtitle,
        userId: post.userId,
        imageId: post.imageId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not be able to create a post with invalid user id', async () => {
      const post = {
        subtitle: 'Teste',
        userId: 'invalid',
        imageId,
      }

      const result = await service.createPost(post)

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('User')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })

    it('should not be able to create a post with invalid image id', async () => {
      const post = {
        subtitle: 'Teste',
        userId,
        imageId: 'invalid',
      }

      const result = await service.createPost(post)

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('Image')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })
  })

  describe('get', () => {
    it('should be able to get all posts', async () => {
      const post = {
        subtitle: 'Teste',
        userId,
        imageId,
      }

      const post2 = {
        subtitle: 'Teste 2',
        userId,
        imageId,
      }

      await service.createPost(post)
      await service.createPost(post2)

      const result = await service.getPosts()

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Posts found successfully')
      expect(result.payload).toStrictEqual([
        {
          id: expect.any(String),
          subtitle: post.subtitle,
          userId: post.userId,
          imageId: post.imageId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          subtitle: post2.subtitle,
          userId: post2.userId,
          imageId: post2.imageId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should be able to get a post by id', async () => {
      const post = {
        subtitle: 'Teste',
        userId,
        imageId,
      }

      const created = await service.createPost(post)

      if (!created.payload) throw new Error('Post not created')

      const result = await service.getPostById(created.payload.id)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Post found successfully')
      expect(result.payload).toStrictEqual({
        id: expect.any(String),
        subtitle: post.subtitle,
        userId: post.userId,
        imageId: post.imageId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not be able to get a post with invalid id', async () => {
      const result = await service.getPostById('invalid')

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('Post')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })

    it('should be able to get all posts from a user', async () => {
      const post = {
        subtitle: 'Teste',
        userId,
        imageId,
      }

      const post2 = {
        subtitle: 'Teste 2',
        userId,
        imageId,
      }

      await service.createPost(post)
      await service.createPost(post2)

      const result = await service.getPostsByUserId(userId)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Posts found successfully')
      expect(result.payload).toStrictEqual([
        {
          id: expect.any(String),
          subtitle: post.subtitle,
          userId: post.userId,
          imageId: post.imageId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          subtitle: post2.subtitle,
          userId: post2.userId,
          imageId: post2.imageId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should not be able to get all posts from a user with invalid id', async () => {
      const result = await service.getPostsByUserId('invalid')

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('User')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })
  })

  describe('update', () => {
    it('should be able to update a post', async () => {
      const post = {
        subtitle: 'Teste',
        userId,
        imageId,
      }

      const created = await service.createPost(post)

      if (!created.payload) throw new Error('Post not created')

      const result = await service.updatePost(created.payload.id, {
        subtitle: 'Teste 2',
      })

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Post updated successfully')
      expect(result.payload).toStrictEqual({
        id: expect.any(String),
        subtitle: 'Teste 2',
        userId: post.userId,
        imageId: post.imageId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not be able to update a post with invalid id', async () => {
      const result = await service.updatePost('invalid', {
        subtitle: 'Teste 2',
      })

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('Post')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })
  })

  describe('delete', () => {
    it('should be able to delete a post', async () => {
      const post = {
        subtitle: 'Teste',
        userId,
        imageId,
      }

      const created = await service.createPost(post)

      if (!created.payload) throw new Error('Post not created')

      const result = await service.deletePost(created.payload.id)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Post deleted successfully')
      expect(result.payload).toBeUndefined()
    })

    it('should not be able to delete a post with invalid id', async () => {
      const result = await service.deletePost('invalid')

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('Post')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })
  })
})
