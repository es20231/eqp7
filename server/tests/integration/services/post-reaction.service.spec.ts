import { instantiatedPostReactionService } from '../../../src/factories/post-reaction.factory'
import { clearPrismaDatabase } from '../../../src/lib/prisma'
import { MemoryImageRepository } from '../../../src/repositories/implementations/memory/image.repository'
import {
  MemoryPostReactionRepository,
  clearPostReactionsMemory,
} from '../../../src/repositories/implementations/memory/post-reaction.repository'
import { MemoryPostRepository } from '../../../src/repositories/implementations/memory/post.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'
import { PrismaImageRepository } from '../../../src/repositories/implementations/prisma/image.repository'
import {
  PrismaPostReactionRepository,
  clearPostReactionsPrisma,
} from '../../../src/repositories/implementations/prisma/post-reaction.repository'
import { PrismaPostRepository } from '../../../src/repositories/implementations/prisma/post.repository'
import { PrismaUserRepository } from '../../../src/repositories/implementations/prisma/user.repository'

describe('MemoryPostReactionService', () => {
  const service = instantiatedPostReactionService(
    MemoryPostReactionRepository,
    MemoryUserRepository,
    MemoryPostRepository,
  )

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  let userId: string
  let imageId: string
  let postId: string

  let userId2: string
  let imageId2: string
  let postId2: string

  let userId3: string
  let imageId3: string
  let postId3: string

  beforeAll(async () => {
    await clearPrismaDatabase()
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

    const post = await MemoryPostRepository.createPost({
      subtitle: 'Post Test',
      userId,
      imageId,
    })

    postId = post.id

    const user2 = await MemoryUserRepository.createUser({
      username: 'test2',
      email: 'test2@mail.com',
      fullName: 'User Test Two',
      password: '123456',
    })

    userId2 = user2.id

    const image2 = await MemoryImageRepository.createImage({
      url: 'https://github.com/JoseeAugusto.png',
      userId: userId2,
    })

    imageId2 = image2.id

    const post2 = await MemoryPostRepository.createPost({
      subtitle: 'Post Test2',
      userId: userId2,
      imageId: imageId2,
    })

    postId2 = post2.id

    const user3 = await MemoryUserRepository.createUser({
      username: 'test3',
      email: 'test3@mail.com',
      fullName: 'User Test Three',
      password: '123456',
    })

    userId3 = user3.id

    const image3 = await MemoryImageRepository.createImage({
      url: 'https://github.com/JoseeAugusto.png',
      userId: userId3,
    })

    imageId3 = image3.id

    const post3 = await MemoryPostRepository.createPost({
      subtitle: 'Post Test3',
      userId: userId3,
      imageId: imageId3,
    })

    postId3 = post3.id
  })

  afterEach(async () => {
    await clearPostReactionsMemory()
  })

  describe('create', () => {
    it('should create a post reaction', async () => {
      const postReaction = await service.createPostReaction({
        type: 'like',
        userId,
        postId,
      })

      expect(postReaction.ok).toBeTruthy()
      expect(postReaction.message).toBe('Post reaction created successfully')
      expect(postReaction.payload).toStrictEqual({
        id: expect.any(String),
        type: 'like',
        userId,
        postId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not create a post reaction if user does not exist', async () => {
      const postReaction = await service.createPostReaction({
        type: 'like',
        userId: 'invalid-user-id',
        postId,
      })

      expect(postReaction.ok).toBeFalsy()
      expect(postReaction.message).toContain('User')
      expect(postReaction.message).toContain('not found')
      expect(postReaction.payload).toBeUndefined()
    })

    it('should not create a post reaction if post does not exist', async () => {
      const postReaction = await service.createPostReaction({
        type: 'like',
        userId,
        postId: 'invalid-post-id',
      })

      expect(postReaction.ok).toBeFalsy()
      expect(postReaction.message).toContain('Post')
      expect(postReaction.message).toContain('not found')
      expect(postReaction.payload).toBeUndefined()
    })
  })

  describe('get', () => {
    it('should get a post reaction', async () => {
      const postReaction =
        await MemoryPostReactionRepository.createPostReaction({
          type: 'like',
          userId,
          postId,
        })

      const foundPostReaction = await service.getPostReactionById(
        postReaction.id,
      )

      expect(foundPostReaction.ok).toBeTruthy()
      expect(foundPostReaction.message).toBe('Post reaction found successfully')
      expect(foundPostReaction.payload).toStrictEqual({
        id: postReaction.id,
        type: 'like',
        userId,
        postId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not get a post reaction if it does not exist', async () => {
      const foundPostReaction = await service.getPostReactionById(
        'invalid-post-reaction-id',
      )

      expect(foundPostReaction.ok).toBeFalsy()
      expect(foundPostReaction.message).toContain('Post reaction')
      expect(foundPostReaction.message).toContain('not found')
      expect(foundPostReaction.payload).toBeUndefined()
    })

    it('should get all post reactions', async () => {
      await MemoryPostReactionRepository.createPostReaction({
        type: 'like',
        userId,
        postId,
      })

      await MemoryPostReactionRepository.createPostReaction({
        type: 'dislike',
        userId: userId2,
        postId: postId2,
      })

      await MemoryPostReactionRepository.createPostReaction({
        type: 'like',
        userId: userId3,
        postId: postId3,
      })

      const foundPostReactions = await service.getPostReactions()

      expect(foundPostReactions.ok).toBeTruthy()
      expect(foundPostReactions.message).toBe(
        'Post reactions found successfully',
      )
      expect(foundPostReactions.payload).toHaveLength(3)
      expect(foundPostReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          userId,
          postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'dislike',
          userId: userId2,
          postId: postId2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'like',
          userId: userId3,
          postId: postId3,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get all post reactions with type like', async () => {
      await MemoryPostReactionRepository.createPostReaction({
        type: 'like',
        userId,
        postId,
      })

      await MemoryPostReactionRepository.createPostReaction({
        type: 'dislike',
        userId: userId2,
        postId: postId2,
      })

      await MemoryPostReactionRepository.createPostReaction({
        type: 'like',
        userId: userId3,
        postId: postId3,
      })

      const foundPostReactions = await service.getPostReactions('like')

      expect(foundPostReactions.ok).toBeTruthy()
      expect(foundPostReactions.message).toBe(
        'Post reactions found successfully',
      )
      expect(foundPostReactions.payload).toHaveLength(2)
      expect(foundPostReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          userId,
          postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'like',
          userId: userId3,
          postId: postId3,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get two post reactions when try to get all post reactions with take 2', async () => {
      await MemoryPostReactionRepository.createPostReaction({
        type: 'like',
        userId,
        postId,
      })

      await MemoryPostReactionRepository.createPostReaction({
        type: 'dislike',
        userId: userId2,
        postId: postId2,
      })

      await MemoryPostReactionRepository.createPostReaction({
        type: 'like',
        userId: userId3,
        postId: postId3,
      })

      const foundPostReactions = await service.getPostReactions(undefined, 2)

      expect(foundPostReactions.ok).toBeTruthy()
      expect(foundPostReactions.message).toBe(
        'Post reactions found successfully',
      )
      expect(foundPostReactions.payload).toHaveLength(2)
      expect(foundPostReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          userId,
          postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'dislike',
          userId: userId2,
          postId: postId2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get one post reaction when try to get all post reactions with take 1 and skip 1', async () => {
      await MemoryPostReactionRepository.createPostReaction({
        type: 'like',
        userId,
        postId,
      })

      await MemoryPostReactionRepository.createPostReaction({
        type: 'dislike',
        userId: userId2,
        postId: postId2,
      })

      await MemoryPostReactionRepository.createPostReaction({
        type: 'like',
        userId: userId3,
        postId: postId3,
      })

      const foundPostReactions = await service.getPostReactions(undefined, 1, 1)

      expect(foundPostReactions.ok).toBeTruthy()
      expect(foundPostReactions.message).toBe(
        'Post reactions found successfully',
      )
      expect(foundPostReactions.payload).toHaveLength(1)
      expect(foundPostReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'dislike',
          userId: userId2,
          postId: postId2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get all post reactions from a post', async () => {
      await MemoryPostReactionRepository.createPostReaction({
        type: 'like',
        userId,
        postId,
      })

      await MemoryPostReactionRepository.createPostReaction({
        type: 'dislike',
        userId: userId2,
        postId,
      })

      await MemoryPostReactionRepository.createPostReaction({
        type: 'like',
        userId: userId3,
        postId,
      })

      const foundPostReactions = await service.getPostReactionsByPostId(postId)

      expect(foundPostReactions.ok).toBeTruthy()
      expect(foundPostReactions.message).toBe(
        'Post reactions found successfully',
      )
      expect(foundPostReactions.payload).toHaveLength(3)
      expect(foundPostReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          userId,
          postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'dislike',
          userId: userId2,
          postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'like',
          userId: userId3,
          postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get all post reactions from a user', async () => {
      await MemoryPostReactionRepository.createPostReaction({
        type: 'like',
        userId,
        postId,
      })

      await MemoryPostReactionRepository.createPostReaction({
        type: 'dislike',
        userId,
        postId: postId2,
      })

      await MemoryPostReactionRepository.createPostReaction({
        type: 'like',
        userId,
        postId: postId3,
      })

      const foundPostReactions = await service.getPostReactionsByUserId(userId)

      expect(foundPostReactions.ok).toBeTruthy()
      expect(foundPostReactions.message).toBe(
        'Post reactions found successfully',
      )
      expect(foundPostReactions.payload).toHaveLength(3)
      expect(foundPostReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          userId,
          postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'dislike',
          userId,
          postId: postId2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'like',
          userId,
          postId: postId3,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should return an empty array when try to get all post reactions from a post that does not have any', async () => {
      const foundPostReactions = await service.getPostReactionsByPostId(postId)

      expect(foundPostReactions.ok).toBeTruthy()
      expect(foundPostReactions.message).toBe(
        'Post reactions found successfully',
      )
      expect(foundPostReactions.payload).toHaveLength(0)
      expect(foundPostReactions.payload).toStrictEqual([])
    })
  })

  describe('delete', () => {
    it('should delete a post reaction', async () => {
      const createdPostReaction =
        await MemoryPostReactionRepository.createPostReaction({
          type: 'like',
          userId,
          postId,
        })

      const deletedPostReaction = await service.deletePostReaction(
        createdPostReaction.id,
        userId,
      )

      expect(deletedPostReaction.ok).toBeTruthy()
      expect(deletedPostReaction.message).toBe(
        'Post reaction deleted successfully',
      )
      expect(deletedPostReaction.payload).toBeUndefined()
    })

    it('should return an error when try to delete a post reaction that does not exist', async () => {
      const deletedPostReaction = await service.deletePostReaction(
        'non-existing-post-reaction-id',
        userId,
      )

      expect(deletedPostReaction.ok).toBeFalsy()
      expect(deletedPostReaction.message).toContain('Post reaction')
      expect(deletedPostReaction.message).toContain('not found')
      expect(deletedPostReaction.payload).toBeUndefined()
    })

    it('should not delete a post reaction with invalid user id', async () => {
      const createdPostReaction =
        await MemoryPostReactionRepository.createPostReaction({
          type: 'like',
          userId,
          postId,
        })

      const deletedPostReaction = await service.deletePostReaction(
        createdPostReaction.id,
        'invalid-user-id',
      )

      expect(deletedPostReaction.ok).toBeFalsy()
      expect(deletedPostReaction.message).toBe('Invalid user id')
      expect(deletedPostReaction.payload).toBeUndefined()
    })
  })
})

describe('PrismaPostReactionService', () => {
  const service = instantiatedPostReactionService(
    PrismaPostReactionRepository,
    PrismaUserRepository,
    PrismaPostRepository,
  )
  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  let userId: string
  let imageId: string
  let postId: string

  let userId2: string
  let imageId2: string
  let postId2: string

  let userId3: string
  let imageId3: string
  let postId3: string

  beforeAll(async () => {
    await clearPrismaDatabase()

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

    const { id: postIdCreated } = await PrismaPostRepository.createPost({
      subtitle: 'Post subtitle',
      userId,
      imageId,
    })

    postId = postIdCreated

    const { id: userIdCreated2 } = await PrismaUserRepository.createUser({
      username: 'test2',
      email: 'test2@mail.com',
      fullName: 'Test User Two',
      password: '123456',
    })

    userId2 = userIdCreated2

    const { id: imageIdCreated2 } = await PrismaImageRepository.createImage({
      url: 'https://github.com/JoseeAugusto.png',
      userId: userId2,
    })

    imageId2 = imageIdCreated2

    const { id: postIdCreated2 } = await PrismaPostRepository.createPost({
      subtitle: 'Post subtitle',
      userId: userId2,
      imageId: imageId2,
    })

    postId2 = postIdCreated2

    const { id: userIdCreated3 } = await PrismaUserRepository.createUser({
      username: 'test3',
      email: 'test3@mail.com',
      fullName: 'Test User Three',
      password: '123456',
    })

    userId3 = userIdCreated3

    const { id: imageIdCreated3 } = await PrismaImageRepository.createImage({
      url: 'https://github.com/JoseeAugusto.png',
      userId: userId3,
    })

    imageId3 = imageIdCreated3

    const { id: postIdCreated3 } = await PrismaPostRepository.createPost({
      subtitle: 'Post subtitle',
      userId: userId3,
      imageId: imageId3,
    })

    postId3 = postIdCreated3
  })

  afterAll(async () => {
    await clearPrismaDatabase()
  })

  afterEach(async () => {
    await clearPostReactionsPrisma()
  })

  describe('create', () => {
    it('should create a post reaction', async () => {
      const createdPostReaction = await service.createPostReaction({
        type: 'like',
        userId,
        postId,
      })

      expect(createdPostReaction.ok).toBeTruthy()
      expect(createdPostReaction.message).toBe(
        'Post reaction created successfully',
      )
      expect(createdPostReaction.payload).toStrictEqual({
        id: expect.any(String),
        type: 'like',
        userId,
        postId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not create a post reaction when the user does not exist', async () => {
      const createdPostReaction = await service.createPostReaction({
        type: 'like',
        userId: 'non-existing-user-id',
        postId,
      })

      expect(createdPostReaction.ok).toBeFalsy()
      expect(createdPostReaction.message).toContain('User')
      expect(createdPostReaction.message).toContain('not found')
      expect(createdPostReaction.payload).toBeUndefined()
    })

    it('should not create a post reaction when the post does not exist', async () => {
      const createdPostReaction = await service.createPostReaction({
        type: 'like',
        userId,
        postId: 'non-existing-post-id',
      })

      expect(createdPostReaction.ok).toBeFalsy()
      expect(createdPostReaction.message).toContain('Post')
      expect(createdPostReaction.message).toContain('not found')
      expect(createdPostReaction.payload).toBeUndefined()
    })
  })

  describe('get', () => {
    it('should get a post reaction by id', async () => {
      const createdPostReaction =
        await PrismaPostReactionRepository.createPostReaction({
          type: 'like',
          userId,
          postId,
        })

      const foundPostReaction = await service.getPostReactionById(
        createdPostReaction.id,
      )

      expect(foundPostReaction.ok).toBeTruthy()
      expect(foundPostReaction.message).toBe('Post reaction found successfully')
      expect(foundPostReaction.payload).toStrictEqual({
        id: expect.any(String),
        type: 'like',
        userId,
        postId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should return an error when try to get a post reaction that does not exist', async () => {
      const foundPostReaction = await service.getPostReactionById(
        'non-existing-post-reaction-id',
      )

      expect(foundPostReaction.ok).toBeFalsy()
      expect(foundPostReaction.message).toContain('Post reaction')
      expect(foundPostReaction.message).toContain('not found')
      expect(foundPostReaction.payload).toBeUndefined()
    })

    it('should get all post reactions from a post', async () => {
      await PrismaPostReactionRepository.createPostReaction({
        type: 'like',
        userId,
        postId,
      })

      await PrismaPostReactionRepository.createPostReaction({
        type: 'dislike',
        userId: userId2,
        postId,
      })

      await PrismaPostReactionRepository.createPostReaction({
        type: 'like',
        userId: userId3,
        postId,
      })

      const foundPostReactions = await service.getPostReactionsByPostId(postId)

      expect(foundPostReactions.ok).toBeTruthy()
      expect(foundPostReactions.message).toBe(
        'Post reactions found successfully',
      )
      expect(foundPostReactions.payload).toHaveLength(3)
      expect(foundPostReactions.payload).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            type: 'like',
            userId,
            postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            type: 'dislike',
            userId: userId2,
            postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            type: 'like',
            userId: userId3,
            postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })

    it('should get all post reactions with type like', async () => {
      await PrismaPostReactionRepository.createPostReaction({
        type: 'like',
        userId,
        postId,
      })

      await PrismaPostReactionRepository.createPostReaction({
        type: 'dislike',
        userId: userId2,
        postId: postId2,
      })

      await PrismaPostReactionRepository.createPostReaction({
        type: 'like',
        userId: userId3,
        postId: postId3,
      })

      const foundPostReactions = await service.getPostReactions('like')

      expect(foundPostReactions.ok).toBeTruthy()
      expect(foundPostReactions.message).toBe(
        'Post reactions found successfully',
      )
      expect(foundPostReactions.payload).toHaveLength(2)
      expect(foundPostReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          userId,
          postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'like',
          userId: userId3,
          postId: postId3,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get two post reactions when try to get all post reactions with take 2', async () => {
      await PrismaPostReactionRepository.createPostReaction({
        type: 'like',
        userId,
        postId,
      })

      await PrismaPostReactionRepository.createPostReaction({
        type: 'dislike',
        userId: userId2,
        postId: postId2,
      })

      await PrismaPostReactionRepository.createPostReaction({
        type: 'like',
        userId: userId3,
        postId: postId3,
      })

      const foundPostReactions = await service.getPostReactions(undefined, 2)

      expect(foundPostReactions.ok).toBeTruthy()
      expect(foundPostReactions.message).toBe(
        'Post reactions found successfully',
      )
      expect(foundPostReactions.payload).toHaveLength(2)
      expect(foundPostReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          userId,
          postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'dislike',
          userId: userId2,
          postId: postId2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get one post reaction when try to get all post reactions with take 1 and skip 1', async () => {
      await PrismaPostReactionRepository.createPostReaction({
        type: 'like',
        userId,
        postId,
      })

      await PrismaPostReactionRepository.createPostReaction({
        type: 'dislike',
        userId: userId2,
        postId: postId2,
      })

      await PrismaPostReactionRepository.createPostReaction({
        type: 'like',
        userId: userId3,
        postId: postId3,
      })

      const foundPostReactions = await service.getPostReactions(undefined, 1, 1)

      expect(foundPostReactions.ok).toBeTruthy()
      expect(foundPostReactions.message).toBe(
        'Post reactions found successfully',
      )
      expect(foundPostReactions.payload).toHaveLength(1)
      expect(foundPostReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'dislike',
          userId: userId2,
          postId: postId2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get all post reactions from a user', async () => {
      await PrismaPostReactionRepository.createPostReaction({
        type: 'like',
        userId,
        postId,
      })

      await PrismaPostReactionRepository.createPostReaction({
        type: 'dislike',
        userId,
        postId: postId2,
      })

      await PrismaPostReactionRepository.createPostReaction({
        type: 'like',
        userId,
        postId: postId3,
      })

      const foundPostReactions = await service.getPostReactionsByUserId(userId)

      expect(foundPostReactions.ok).toBeTruthy()
      expect(foundPostReactions.message).toBe(
        'Post reactions found successfully',
      )
      expect(foundPostReactions.payload).toHaveLength(3)
      expect(foundPostReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          userId,
          postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'dislike',
          userId,
          postId: postId2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'like',
          userId,
          postId: postId3,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get all post reactions from a post', async () => {
      await PrismaPostReactionRepository.createPostReaction({
        type: 'like',
        userId,
        postId,
      })

      await PrismaPostReactionRepository.createPostReaction({
        type: 'dislike',
        userId: userId2,
        postId,
      })

      await PrismaPostReactionRepository.createPostReaction({
        type: 'like',
        userId: userId3,
        postId,
      })

      const foundPostReactions = await service.getPostReactionsByPostId(postId)

      expect(foundPostReactions.ok).toBeTruthy()
      expect(foundPostReactions.message).toBe(
        'Post reactions found successfully',
      )
      expect(foundPostReactions.payload).toHaveLength(3)
      expect(foundPostReactions.payload).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            type: 'like',
            userId,
            postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            type: 'dislike',
            userId: userId2,
            postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            type: 'like',
            userId: userId3,
            postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })

    it('should return an empty array when try to get all post reactions from a user that does not have any post reaction', async () => {
      const foundPostReactions = await service.getPostReactionsByUserId(userId)

      expect(foundPostReactions.ok).toBeTruthy()
      expect(foundPostReactions.message).toBe(
        'Post reactions found successfully',
      )
      expect(foundPostReactions.payload).toHaveLength(0)
      expect(foundPostReactions.payload).toStrictEqual([])
    })
  })

  describe('delete', () => {
    it('should delete a post reaction', async () => {
      const createdPostReaction =
        await PrismaPostReactionRepository.createPostReaction({
          type: 'like',
          userId,
          postId,
        })

      const deletedPostReaction = await service.deletePostReaction(
        createdPostReaction.id,
        userId,
      )

      expect(deletedPostReaction.ok).toBeTruthy()
      expect(deletedPostReaction.message).toBe(
        'Post reaction deleted successfully',
      )
      expect(deletedPostReaction.payload).toBeUndefined()
    })

    it('should return an error when try to delete a post reaction that does not exist', async () => {
      const deletedPostReaction = await service.deletePostReaction(
        'non-existing-post-reaction-id',
        userId,
      )

      expect(deletedPostReaction.ok).toBeFalsy()
      expect(deletedPostReaction.message).toContain('Post reaction')
      expect(deletedPostReaction.message).toContain('not found')
      expect(deletedPostReaction.payload).toBeUndefined()
    })

    it('should not delete a post reaction with invalid user id', async () => {
      const createdPostReaction =
        await PrismaPostReactionRepository.createPostReaction({
          type: 'like',
          userId,
          postId,
        })

      const deletedPostReaction = await service.deletePostReaction(
        createdPostReaction.id,
        'invalid-user-id',
      )

      expect(deletedPostReaction.ok).toBeFalsy()
      expect(deletedPostReaction.message).toBe('Invalid user id')
      expect(deletedPostReaction.payload).toBeUndefined()
    })
  })
})
