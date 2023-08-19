import { instantiatedCommentService } from '../../../src/factories/comment.factory'
import { clearPrismaDatabase } from '../../../src/lib/prisma'
import {
  MemoryCommentRepository,
  clearCommentMemory,
} from '../../../src/repositories/implementations/memory/comment.repository'
import { MemoryImageRepository } from '../../../src/repositories/implementations/memory/image.repository'
import { MemoryPostRepository } from '../../../src/repositories/implementations/memory/post.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'
import {
  PrismaCommentRepository,
  clearCommentsPrisma,
} from '../../../src/repositories/implementations/prisma/comment.repository'
import { PrismaImageRepository } from '../../../src/repositories/implementations/prisma/image.repository'
import { PrismaPostRepository } from '../../../src/repositories/implementations/prisma/post.repository'
import { PrismaUserRepository } from '../../../src/repositories/implementations/prisma/user.repository'

describe('MemoryCommentService', () => {
  const service = instantiatedCommentService(
    MemoryCommentRepository,
    MemoryUserRepository,
    MemoryPostRepository,
  )
  it('should to be defined', () => {
    expect(service).toBeDefined()
  })

  let userId: string
  let postId: string
  let imageId: string

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
  })

  afterEach(async () => {
    await clearCommentMemory()
  })

  describe('create', () => {
    it('should create a comment', async () => {
      const comment = {
        content: 'Comment Test',
        userId,
        postId,
      }

      const result = await service.createComment(comment)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comment created successfully')
      expect(result.payload).toStrictEqual({
        id: expect.any(String),
        content: comment.content,
        userId: comment.userId,
        postId: comment.postId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })
    it('should not create a comment with invalid user id', async () => {
      const comment = {
        content: 'Comment Test',
        userId: 'invalid-user-id',
        postId,
      }

      const result = await service.createComment(comment)

      expect(result.ok).toBeFalsy()
      expect(result.message).toBe(`User #${comment.userId} not found`)
      expect(result.payload).toBeUndefined()
    })
    it('should not create a comment with invalid post id', async () => {
      const comment = {
        content: 'Comment Test',
        userId,
        postId: 'invalid-post-id',
      }

      const result = await service.createComment(comment)

      expect(result.ok).toBeFalsy()
      expect(result.message).toBe(`Post #${comment.postId} not found`)
      expect(result.payload).toBeUndefined()
    })
  })

  describe('get', () => {
    it('should get a comment by id', async () => {
      const comment = {
        content: 'Comment Test',
        userId,
        postId,
      }

      const createdComment = await service.createComment(comment)

      if (!createdComment.payload) {
        throw new Error('Comment not created')
      }

      const result = await service.getCommentById(createdComment.payload.id)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comment found successfully')
      expect(result.payload).toStrictEqual(createdComment.payload)
    })
    it('should not get a comment with invalid id', async () => {
      const result = await service.getCommentById('invalid-comment-id')

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('Comment')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })

    it('should get two comments when try to get all comments with take 2', async () => {
      const comment1 = {
        content: 'Comment Test 1',
        userId,
        postId,
      }

      await service.createComment(comment1)

      const comment2 = {
        content: 'Comment Test 2',
        userId,
        postId,
      }

      await service.createComment(comment2)

      const comment3 = {
        content: 'Comment Test 3',
        userId,
        postId,
      }

      await service.createComment(comment3)

      const result = await service.getComments(2)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comments found successfully')
      expect(result.payload).toHaveLength(2)
      expect(result.payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            content: comment1.content,
            userId: comment1.userId,
            postId: comment1.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            content: comment2.content,
            userId: comment2.userId,
            postId: comment2.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })

    it('should get two comments when try to get all comments with take 2 and skip 2', async () => {
      const comment1 = {
        content: 'Comment Test 1',
        userId,
        postId,
      }

      await service.createComment(comment1)

      const comment2 = {
        content: 'Comment Test 2',
        userId,
        postId,
      }

      await service.createComment(comment2)

      const comment3 = {
        content: 'Comment Test 3',
        userId,
        postId,
      }

      await service.createComment(comment3)

      const comment4 = {
        content: 'Comment Test 4',
        userId,
        postId,
      }

      await service.createComment(comment4)

      const result = await service.getComments(2, 2)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comments found successfully')
      expect(result.payload).toHaveLength(2)
      expect(result.payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            content: comment3.content,
            userId: comment3.userId,
            postId: comment3.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            content: comment4.content,
            userId: comment4.userId,
            postId: comment4.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })
    it('should not get comments with invalid user id', async () => {
      const result = await service.getCommentsByUserId('invalid-user-id', 10, 0)

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('User')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })
    it('should not get comments with invalid post id', async () => {
      const result = await service.getCommentsByPostId('invalid-post-id', 10, 0)

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('Post')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })
    it('should get two comments when try to get all comments with take 2 and user id', async () => {
      const comment1 = {
        content: 'Comment Test 1',
        userId,
        postId,
      }

      await service.createComment(comment1)

      const comment2 = {
        content: 'Comment Test 2',
        userId,
        postId,
      }

      await service.createComment(comment2)

      const comment3 = {
        content: 'Comment Test 3',
        userId,
        postId,
      }

      await service.createComment(comment3)

      const comment4 = {
        content: 'Comment Test 4',
        userId,
        postId,
      }

      await service.createComment(comment4)

      const result = await service.getCommentsByUserId(userId, 2)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comments found successfully')
      expect(result.payload).toHaveLength(2)
      expect(result.payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            content: comment1.content,
            userId: comment1.userId,
            postId: comment1.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            content: comment2.content,
            userId: comment2.userId,
            postId: comment2.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })
    it('should get two comments when try to get all comments with take 2, skip 2 and user id', async () => {
      const comment1 = {
        content: 'Comment Test 1',
        userId,
        postId,
      }

      await service.createComment(comment1)

      const comment2 = {
        content: 'Comment Test 2',
        userId,
        postId,
      }

      await service.createComment(comment2)

      const comment3 = {
        content: 'Comment Test 3',
        userId,
        postId,
      }

      await service.createComment(comment3)

      const comment4 = {
        content: 'Comment Test 4',
        userId,
        postId,
      }

      await service.createComment(comment4)

      const result = await service.getCommentsByUserId(userId, 2, 2)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comments found successfully')
      expect(result.payload).toHaveLength(2)
      expect(result.payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            content: comment3.content,
            userId: comment3.userId,
            postId: comment3.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            content: comment4.content,
            userId: comment4.userId,
            postId: comment4.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })
    it('should get two comments when try to get all comments with take 2 and post id', async () => {
      const comment1 = {
        content: 'Comment Test 1',
        userId,
        postId,
      }

      await service.createComment(comment1)

      const comment2 = {
        content: 'Comment Test 2',
        userId,
        postId,
      }

      await service.createComment(comment2)

      const comment3 = {
        content: 'Comment Test 3',
        userId,
        postId,
      }

      await service.createComment(comment3)

      const comment4 = {
        content: 'Comment Test 4',
        userId,
        postId,
      }

      await service.createComment(comment4)

      const result = await service.getCommentsByPostId(postId, 2)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comments found successfully')
      expect(result.payload).toHaveLength(2)
      expect(result.payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            content: comment1.content,
            userId: comment1.userId,
            postId: comment1.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            content: comment2.content,
            userId: comment2.userId,
            postId: comment2.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })
    it('should get two comments when try to get all comments with take 2, skip 2 and post id', async () => {
      const comment1 = {
        content: 'Comment Test 1',
        userId,
        postId,
      }

      await service.createComment(comment1)

      const comment2 = {
        content: 'Comment Test 2',
        userId,
        postId,
      }

      await service.createComment(comment2)

      const comment3 = {
        content: 'Comment Test 3',
        userId,
        postId,
      }

      await service.createComment(comment3)

      const comment4 = {
        content: 'Comment Test 4',
        userId,
        postId,
      }

      await service.createComment(comment4)

      const result = await service.getCommentsByPostId(postId, 2, 2)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comments found successfully')
      expect(result.payload).toHaveLength(2)
      expect(result.payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            content: comment3.content,
            userId: comment3.userId,
            postId: comment3.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            content: comment4.content,
            userId: comment4.userId,
            postId: comment4.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })
  })
  describe('delete', () => {
    it('should delete a comment', async () => {
      const comment = {
        content: 'Comment Test',
        userId,
        postId,
      }

      const { payload } = await service.createComment(comment)

      if (!payload) throw new Error('Comment not created')

      const post = await MemoryPostRepository.getPostById(postId)

      if (!post) throw new Error('Post not found')

      const result = await service.deleteComment(payload.id, post.userId)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comment deleted successfully')
      expect(result.payload).toBeUndefined()
    })
    it('should not delete a comment when comment id is invalid', async () => {
      const result = await service.deleteComment('invalidId', userId)

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('Comment')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })
    it('should not delete a comment when user id is invalid', async () => {
      const comment = {
        content: 'Comment Test',
        userId,
        postId,
      }

      const { payload } = await service.createComment(comment)

      if (!payload) throw new Error('Comment not created')

      const result = await service.deleteComment(payload.id, 'invalidId')

      expect(result.ok).toBeFalsy()
      expect(result.message).toBe('Invalid user id')
      expect(result.payload).toBeUndefined()
    })
  })
})

describe('PrismaCommentService', () => {
  const service = instantiatedCommentService(
    PrismaCommentRepository,
    PrismaUserRepository,
    PrismaPostRepository,
  )
  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  let userId: string
  let postId: string
  let imageId: string

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
  })

  afterAll(async () => {
    await clearPrismaDatabase()
  })

  afterEach(async () => {
    await clearCommentsPrisma()
  })

  describe('create', () => {
    it('should create a comment', async () => {
      const comment = {
        content: 'Comment Test',
        userId,
        postId,
      }

      const result = await service.createComment(comment)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comment created successfully')
      expect(result.payload).toStrictEqual(
        expect.objectContaining({
          id: expect.any(String),
          content: comment.content,
          userId: comment.userId,
          postId: comment.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      )
    })
    it('should not create a comment when user id is invalid', async () => {
      const comment = {
        content: 'Comment Test',
        userId: 'invalidId',
        postId,
      }

      const result = await service.createComment(comment)

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('User')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })
    it('should not create a comment when post id is invalid', async () => {
      const comment = {
        content: 'Comment Test',
        userId,
        postId: 'invalidId',
      }

      const result = await service.createComment(comment)

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('Post')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })
  })

  describe('get', () => {
    it('should get a comment by id', async () => {
      const comment = {
        content: 'Comment Test',
        userId,
        postId,
      }

      const { payload } = await service.createComment(comment)

      if (!payload) throw new Error('Comment not created')

      const result = await service.getCommentById(payload.id)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comment found successfully')
      expect(result.payload).toStrictEqual(
        expect.objectContaining({
          id: expect.any(String),
          content: comment.content,
          userId: comment.userId,
          postId: comment.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      )
    })
    it('should not get a comment when comment id is invalid', async () => {
      const result = await service.getCommentById('invalidId')

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('Comment')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })

    it('should get all comments', async () => {
      const comment1 = {
        content: 'Comment Test 1',
        userId,
        postId,
      }

      await service.createComment(comment1)

      const comment2 = {
        content: 'Comment Test 2',
        userId,
        postId,
      }

      await service.createComment(comment2)

      const result = await service.getComments()

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comments found successfully')
      expect(result.payload).toHaveLength(2)
      expect(result.payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            content: comment1.content,
            userId: comment1.userId,
            postId: comment1.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            content: comment2.content,
            userId: comment2.userId,
            postId: comment2.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })
    it('should get two comments when try to get all comments with take 2 and user id', async () => {
      const comment1 = {
        content: 'Comment Test 1',
        userId,
        postId,
      }

      await service.createComment(comment1)

      const comment2 = {
        content: 'Comment Test 2',
        userId,
        postId,
      }

      await service.createComment(comment2)

      const comment3 = {
        content: 'Comment Test 3',
        userId,
        postId,
      }

      await service.createComment(comment3)

      const result = await service.getCommentsByUserId(userId, 2)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comments found successfully')
      expect(result.payload).toHaveLength(2)
      expect(result.payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            content: comment1.content,
            userId: comment1.userId,
            postId: comment1.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            content: comment2.content,
            userId: comment2.userId,
            postId: comment2.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })
    it('should get two comments when try to get all comments with take 2 and post id', async () => {
      const comment1 = {
        content: 'Comment Test 1',
        userId,
        postId,
      }

      await service.createComment(comment1)

      const comment2 = {
        content: 'Comment Test 2',
        userId,
        postId,
      }

      await service.createComment(comment2)

      const comment3 = {
        content: 'Comment Test 3',
        userId,
        postId,
      }

      await service.createComment(comment3)

      const result = await service.getCommentsByPostId(postId, 2)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comments found successfully')
      expect(result.payload).toHaveLength(2)
      expect(result.payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            content: comment1.content,
            userId: comment1.userId,
            postId: comment1.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            content: comment2.content,
            userId: comment2.userId,
            postId: comment2.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })
    it('should get two comments when try to get all comments with take 2, skip 2 and user id', async () => {
      const comment1 = {
        content: 'Comment Test 1',
        userId,
        postId,
      }

      await service.createComment(comment1)

      const comment2 = {
        content: 'Comment Test 2',
        userId,
        postId,
      }

      await service.createComment(comment2)

      const comment3 = {
        content: 'Comment Test 3',
        userId,
        postId,
      }

      await service.createComment(comment3)

      const comment4 = {
        content: 'Comment Test 4',
        userId,
        postId,
      }

      await service.createComment(comment4)

      const result = await service.getCommentsByUserId(userId, 2, 2)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comments found successfully')
      expect(result.payload).toHaveLength(2)
      expect(result.payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            content: comment3.content,
            userId: comment3.userId,
            postId: comment3.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            content: comment4.content,
            userId: comment4.userId,
            postId: comment4.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })
    it('should get two comments when try to get all comments with take 2, skip 2 and post id', async () => {
      const comment1 = {
        content: 'Comment Test 1',
        userId,
        postId,
      }

      await service.createComment(comment1)

      const comment2 = {
        content: 'Comment Test 2',
        userId,
        postId,
      }

      await service.createComment(comment2)

      const comment3 = {
        content: 'Comment Test 3',
        userId,
        postId,
      }

      await service.createComment(comment3)

      const comment4 = {
        content: 'Comment Test 4',
        userId,
        postId,
      }

      await service.createComment(comment4)

      const result = await service.getCommentsByPostId(postId, 2, 2)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comments found successfully')
      expect(result.payload).toHaveLength(2)
      expect(result.payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            content: comment3.content,
            userId: comment3.userId,
            postId: comment3.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            content: comment4.content,
            userId: comment4.userId,
            postId: comment4.postId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })
  })
  describe('delete', () => {
    it('should delete a comment when try to delete a comment', async () => {
      const comment = {
        content: 'Comment Test',
        userId,
        postId,
      }

      const { payload } = await service.createComment(comment)

      if (!payload) throw new Error('Comment not created')

      const post = await PrismaPostRepository.getPostById(postId)

      if (!post) throw new Error('Post not found')

      const result = await service.deleteComment(payload.id, post.userId)

      expect(result.ok).toBeTruthy()
      expect(result.message).toBe('Comment deleted successfully')
      expect(result.payload).toBeUndefined()
    })
    it('should not delete a comment when try to delete a comment with invalid id', async () => {
      const result = await service.deleteComment('invalid_id', userId)

      expect(result.ok).toBeFalsy()
      expect(result.message).toContain('Comment')
      expect(result.message).toContain('not found')
      expect(result.payload).toBeUndefined()
    })
    it('should not delete a comment when user id is different from post user id', async () => {
      const comment = {
        content: 'Comment Test',
        userId,
        postId,
      }

      const { payload } = await service.createComment(comment)

      if (!payload) throw new Error('Comment not created')

      const result = await service.deleteComment(payload.id, 'invalid_id')

      expect(result.ok).toBeFalsy()
      expect(result.message).toBe('Invalid user id')
      expect(result.payload).toBeUndefined()
    })
  })
})
