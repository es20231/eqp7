import { instantiatedCommentReactionService } from '../../../src/factories/comment-reaction.factory'
import { clearPrismaDatabase } from '../../../src/lib/prisma'
import {
  MemoryCommentReactionRepository,
  clearCommentReactionsMemory,
} from '../../../src/repositories/implementations/memory/comment-reaction.repository'
import { MemoryCommentRepository } from '../../../src/repositories/implementations/memory/comment.repository'
import { MemoryImageRepository } from '../../../src/repositories/implementations/memory/image.repository'
import { MemoryPostRepository } from '../../../src/repositories/implementations/memory/post.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'
import {
  PrismaCommentReactionRepository,
  clearCommentReactionsPrisma,
} from '../../../src/repositories/implementations/prisma/comment-reaction.repository'
import { PrismaCommentRepository } from '../../../src/repositories/implementations/prisma/comment.repository'
import { PrismaImageRepository } from '../../../src/repositories/implementations/prisma/image.repository'
import { PrismaPostRepository } from '../../../src/repositories/implementations/prisma/post.repository'
import { PrismaUserRepository } from '../../../src/repositories/implementations/prisma/user.repository'

describe('MemoryCommentReactionService', () => {
  const service = instantiatedCommentReactionService(
    MemoryCommentReactionRepository,
    MemoryUserRepository,
    MemoryPostRepository,
    MemoryCommentRepository,
  )

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  let userId: string
  let imageId: string
  let postId: string
  let commentId: string

  let userId2: string
  let imageId2: string
  let postId2: string
  let commentId2: string

  let userId3: string
  let imageId3: string
  let postId3: string
  let commentId3: string

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

    const comment = await MemoryCommentRepository.createComment({
      content: 'Comment Test',
      userId,
      postId,
    })

    commentId = comment.id

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

    const comment2 = await MemoryCommentRepository.createComment({
      content: 'Comment Test2',
      userId: userId2,
      postId: postId2,
    })

    commentId2 = comment2.id

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

    const comment3 = await MemoryCommentRepository.createComment({
      content: 'Comment Test3',
      userId: userId3,
      postId: postId3,
    })

    commentId3 = comment3.id
  })

  afterEach(async () => {
    await clearCommentReactionsMemory()
  })

  describe('create', () => {
    it('should create a comment reaction', async () => {
      const commentReaction = await service.createCommentReaction({
        type: 'like',
        commentId,
        userId,
      })

      expect(commentReaction.ok).toBeTruthy()
      expect(commentReaction.message).toBe(
        'Comment reaction created successfully',
      )
      expect(commentReaction.payload).toStrictEqual({
        id: expect.any(String),
        type: 'like',
        commentId,
        userId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not create a comment reaction if the comment does not exist', async () => {
      const commentReaction = await service.createCommentReaction({
        type: 'like',
        commentId: 'invalid-comment-id',
        userId,
      })

      expect(commentReaction.ok).toBeFalsy()
      expect(commentReaction.message).toContain('Comment')
      expect(commentReaction.message).toContain('not found')
      expect(commentReaction.payload).toBeUndefined()
    })

    it('should not create a comment reaction if the user does not exist', async () => {
      const commentReaction = await service.createCommentReaction({
        type: 'like',
        commentId,
        userId: 'invalid-user-id',
      })

      expect(commentReaction.ok).toBeFalsy()
      expect(commentReaction.message).toContain('User')
      expect(commentReaction.message).toContain('not found')
      expect(commentReaction.payload).toBeUndefined()
    })
  })

  describe('get', () => {
    it('should get a comment reaction', async () => {
      const commentReaction =
        await MemoryCommentReactionRepository.createCommentReaction({
          type: 'like',
          commentId,
          userId,
        })

      const getCommentReaction = await service.getCommentReactionById(
        commentReaction.id,
      )

      expect(getCommentReaction.ok).toBeTruthy()
      expect(getCommentReaction.message).toBe(
        'Comment reaction found successfully',
      )
      expect(getCommentReaction.payload).toStrictEqual({
        id: commentReaction.id,
        type: 'like',
        commentId,
        userId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not get a comment reaction if it does not exist', async () => {
      const getCommentReaction = await service.getCommentReactionById(
        'invalid-comment-reaction-id',
      )

      expect(getCommentReaction.ok).toBeFalsy()
      expect(getCommentReaction.message).toContain('Comment reaction')
      expect(getCommentReaction.message).toContain('not found')
      expect(getCommentReaction.payload).toBeUndefined()
    })

    it('should get all comment reactions', async () => {
      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId,
      })

      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'dislike',
        commentId: commentId2,
        userId: userId2,
      })

      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId: commentId3,
        userId: userId3,
      })

      const getCommentReactions = await service.getCommentReactions()

      expect(getCommentReactions.ok).toBeTruthy()
      expect(getCommentReactions.message).toBe(
        'Comment reactions found successfully',
      )
      expect(getCommentReactions.payload).toHaveLength(3)
      expect(getCommentReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          commentId,
          userId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'dislike',
          commentId: commentId2,
          userId: userId2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'like',
          commentId: commentId3,
          userId: userId3,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get all comment reactions with type dislike', async () => {
      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId,
      })

      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'dislike',
        commentId: commentId2,
        userId: userId2,
      })

      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId: commentId3,
        userId: userId3,
      })

      const getCommentReactions = await service.getCommentReactions('dislike')

      expect(getCommentReactions.ok).toBeTruthy()
      expect(getCommentReactions.message).toBe(
        'Comment reactions found successfully',
      )
      expect(getCommentReactions.payload).toHaveLength(1)
      expect(getCommentReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'dislike',
          commentId: commentId2,
          userId: userId2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get two comment reactions when try to get all comment reactions with take 2', async () => {
      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId,
      })

      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'dislike',
        commentId: commentId2,
        userId: userId2,
      })

      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId: commentId3,
        userId: userId3,
      })

      const getCommentReactions = await service.getCommentReactions(
        undefined,
        2,
      )

      expect(getCommentReactions.ok).toBeTruthy()
      expect(getCommentReactions.message).toBe(
        'Comment reactions found successfully',
      )
      expect(getCommentReactions.payload).toHaveLength(2)
      expect(getCommentReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          commentId,
          userId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'dislike',
          commentId: commentId2,
          userId: userId2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get one comment reaction when try to get all comment reactions with take 1 and skip 1', async () => {
      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId,
      })

      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'dislike',
        commentId: commentId2,
        userId: userId2,
      })

      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId: commentId3,
        userId: userId3,
      })

      const getCommentReactions = await service.getCommentReactions(
        undefined,
        1,
        1,
      )

      expect(getCommentReactions.ok).toBeTruthy()
      expect(getCommentReactions.message).toBe(
        'Comment reactions found successfully',
      )
      expect(getCommentReactions.payload).toHaveLength(1)
      expect(getCommentReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'dislike',
          commentId: commentId2,
          userId: userId2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get all comment reactions from a comment', async () => {
      const commentId4 = 'comment-id-4'

      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId,
      })

      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'dislike',
        commentId,
        userId: userId2,
      })

      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId: commentId4,
        userId,
      })

      const getCommentReactions = await service.getCommentReactionsByCommentId(
        commentId,
      )

      expect(getCommentReactions.ok).toBeTruthy()
      expect(getCommentReactions.message).toBe(
        'Comment reactions found successfully',
      )
      expect(getCommentReactions.payload).toHaveLength(2)
      expect(getCommentReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          commentId,
          userId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'dislike',
          commentId,
          userId: userId2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get all comment reactions from a user', async () => {
      const userId4 = 'user-id-4'

      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId,
      })

      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'dislike',
        commentId: commentId2,
        userId,
      })

      await MemoryCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId: userId4,
      })

      const getCommentReactions = await service.getCommentReactionsByUserId(
        userId,
      )

      expect(getCommentReactions.ok).toBeTruthy()
      expect(getCommentReactions.message).toBe(
        'Comment reactions found successfully',
      )
      expect(getCommentReactions.payload).toHaveLength(2)
      expect(getCommentReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          commentId,
          userId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'dislike',
          commentId: commentId2,
          userId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should return an empty array when try to get all comment reactions from a comment that does not have any comment reaction', async () => {
      const getCommentReactions = await service.getCommentReactionsByCommentId(
        commentId,
      )

      expect(getCommentReactions.ok).toBeTruthy()
      expect(getCommentReactions.message).toBe(
        'Comment reactions found successfully',
      )
      expect(getCommentReactions.payload).toHaveLength(0)
      expect(getCommentReactions.payload).toStrictEqual([])
    })
  })

  describe('delete', () => {
    it('should delete a comment reaction', async () => {
      const commentReaction =
        await MemoryCommentReactionRepository.createCommentReaction({
          type: 'like',
          commentId,
          userId,
        })

      const deleteCommentReaction = await service.deleteCommentReaction(
        commentReaction.id,
        userId,
      )

      expect(deleteCommentReaction.ok).toBeTruthy()
      expect(deleteCommentReaction.message).toBe(
        'Comment reaction deleted successfully',
      )
      expect(deleteCommentReaction.payload).toBeUndefined()
    })

    it('should return an error when try to delete a comment reaction that does not exist', async () => {
      const deleteCommentReaction = await service.deleteCommentReaction(
        'comment-reaction-id',
        userId,
      )

      expect(deleteCommentReaction.ok).toBeFalsy()
      expect(deleteCommentReaction.message).toContain('Comment reaction')
      expect(deleteCommentReaction.message).toContain('not found')
      expect(deleteCommentReaction.payload).toBeUndefined()
    })

    it('should not delete a comment reaction when user id is invalid', async () => {
      const commentReaction =
        await MemoryCommentReactionRepository.createCommentReaction({
          type: 'like',
          commentId,
          userId,
        })

      const deleteCommentReaction = await service.deleteCommentReaction(
        commentReaction.id,
        'user-id',
      )

      expect(deleteCommentReaction.ok).toBeFalsy()
      expect(deleteCommentReaction.message).toBe('Invalid user id')
      expect(deleteCommentReaction.payload).toBeUndefined()
    })
  })
})

describe('PrismaCommentReactionService', () => {
  const service = instantiatedCommentReactionService(
    PrismaCommentReactionRepository,
    PrismaUserRepository,
    PrismaPostRepository,
    PrismaCommentRepository,
  )
  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  let userId: string
  let imageId: string
  let postId: string
  let commentId: string

  let userId2: string
  let imageId2: string
  let postId2: string
  let commentId2: string

  let userId3: string
  let imageId3: string
  let postId3: string
  let commentId3: string

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

    const { id: commentIdCreated } =
      await PrismaCommentRepository.createComment({
        content: 'Comment content',
        postId,
        userId,
      })

    commentId = commentIdCreated

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
      subtitle: 'Post subtitle2',
      userId: userId2,
      imageId: imageId2,
    })

    postId2 = postIdCreated2

    const { id: commentIdCreated2 } =
      await PrismaCommentRepository.createComment({
        content: 'Comment content2',
        postId: postId2,
        userId: userId2,
      })

    commentId2 = commentIdCreated2

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
      subtitle: 'Post subtitle3',
      userId: userId3,
      imageId: imageId3,
    })

    postId3 = postIdCreated3

    const { id: commentIdCreated3 } =
      await PrismaCommentRepository.createComment({
        content: 'Comment content3',
        postId: postId3,
        userId: userId3,
      })

    commentId3 = commentIdCreated3
  })

  afterAll(async () => {
    await clearPrismaDatabase()
  })

  afterEach(async () => {
    await clearCommentReactionsPrisma()
  })

  describe('create', () => {
    it('should create a comment reaction', async () => {
      const createCommentReaction = await service.createCommentReaction({
        type: 'like',
        commentId,
        userId,
      })

      expect(createCommentReaction.ok).toBeTruthy()
      expect(createCommentReaction.message).toBe(
        'Comment reaction created successfully',
      )
      expect(createCommentReaction.payload).toStrictEqual({
        id: expect.any(String),
        type: 'like',
        commentId,
        userId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not create a comment reaction when the comment does not exist', async () => {
      const createCommentReaction = await service.createCommentReaction({
        type: 'like',
        commentId: 'comment-id',
        userId,
      })

      expect(createCommentReaction.ok).toBeFalsy()
      expect(createCommentReaction.message).toContain('Comment')
      expect(createCommentReaction.message).toContain('not found')
      expect(createCommentReaction.payload).toBeUndefined()
    })

    it('should not create a comment reaction when the user does not exist', async () => {
      const createCommentReaction = await service.createCommentReaction({
        type: 'like',
        commentId,
        userId: 'user-id',
      })

      expect(createCommentReaction.ok).toBeFalsy()
      expect(createCommentReaction.message).toContain('User')
      expect(createCommentReaction.message).toContain('not found')
      expect(createCommentReaction.payload).toBeUndefined()
    })
  })

  describe('get', () => {
    it('should get a comment reaction by its id', async () => {
      const commentReaction =
        await PrismaCommentReactionRepository.createCommentReaction({
          type: 'like',
          commentId,
          userId,
        })

      const getCommentReaction = await service.getCommentReactionById(
        commentReaction.id,
      )

      expect(getCommentReaction.ok).toBeTruthy()
      expect(getCommentReaction.message).toBe(
        'Comment reaction found successfully',
      )
      expect(getCommentReaction.payload).toStrictEqual({
        id: expect.any(String),
        type: 'like',
        commentId,
        userId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should return an error when try to get a comment reaction that does not exist', async () => {
      const getCommentReaction = await service.getCommentReactionById(
        'comment-reaction-id',
      )

      expect(getCommentReaction.ok).toBeFalsy()
      expect(getCommentReaction.message).toContain('Comment reaction')
      expect(getCommentReaction.message).toContain('not found')
      expect(getCommentReaction.payload).toBeUndefined()
    })

    it('should get all comment reactions from a comment', async () => {
      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId,
      })

      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'dislike',
        commentId,
        userId: userId2,
      })

      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId: userId3,
      })

      const getCommentReactions = await service.getCommentReactionsByCommentId(
        commentId,
      )

      expect(getCommentReactions.ok).toBeTruthy()
      expect(getCommentReactions.message).toBe(
        'Comment reactions found successfully',
      )
      expect(getCommentReactions.payload).toHaveLength(3)
      expect(getCommentReactions.payload).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            type: 'like',
            commentId,
            userId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            type: 'dislike',
            commentId,
            userId: userId2,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            type: 'like',
            commentId,
            userId: userId3,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })

    it('should get all comment reactions with type like', async () => {
      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId,
      })

      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'dislike',
        commentId: commentId2,
        userId: userId2,
      })

      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId: commentId3,
        userId: userId3,
      })

      const getCommentReactions = await service.getCommentReactions('like')

      expect(getCommentReactions.ok).toBeTruthy()
      expect(getCommentReactions.message).toBe(
        'Comment reactions found successfully',
      )
      expect(getCommentReactions.payload).toHaveLength(2)
      expect(getCommentReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          commentId,
          userId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'like',
          commentId: commentId3,
          userId: userId3,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get two comment reactions when try to get all comment reactions with take 2', async () => {
      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId,
      })

      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'dislike',
        commentId: commentId2,
        userId: userId2,
      })

      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId: commentId3,
        userId: userId3,
      })

      const getCommentReactions = await service.getCommentReactions(
        undefined,
        2,
      )

      expect(getCommentReactions.ok).toBeTruthy()
      expect(getCommentReactions.message).toBe(
        'Comment reactions found successfully',
      )
      expect(getCommentReactions.payload).toHaveLength(2)
      expect(getCommentReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          commentId,
          userId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'dislike',
          commentId: commentId2,
          userId: userId2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get one comment reaction when try to get all comment reactions with take 1 and skip 1', async () => {
      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId,
      })

      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'dislike',
        commentId: commentId2,
        userId: userId2,
      })

      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId: commentId3,
        userId: userId3,
      })

      const getCommentReactions = await service.getCommentReactions(
        undefined,
        1,
        1,
      )

      expect(getCommentReactions.ok).toBeTruthy()
      expect(getCommentReactions.message).toBe(
        'Comment reactions found successfully',
      )
      expect(getCommentReactions.payload).toHaveLength(1)
      expect(getCommentReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'dislike',
          commentId: commentId2,
          userId: userId2,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get all comment reactions from a user', async () => {
      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId,
      })

      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'dislike',
        commentId: commentId2,
        userId,
      })

      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId: commentId3,
        userId,
      })

      const getCommentReactions = await service.getCommentReactionsByUserId(
        userId,
      )

      expect(getCommentReactions.ok).toBeTruthy()
      expect(getCommentReactions.message).toBe(
        'Comment reactions found successfully',
      )
      expect(getCommentReactions.payload).toHaveLength(3)
      expect(getCommentReactions.payload).toStrictEqual([
        {
          id: expect.any(String),
          type: 'like',
          commentId,
          userId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'dislike',
          commentId: commentId2,
          userId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          type: 'like',
          commentId: commentId3,
          userId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })

    it('should get all comment reactions from a comment', async () => {
      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId,
      })

      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'dislike',
        commentId,
        userId: userId2,
      })

      await PrismaCommentReactionRepository.createCommentReaction({
        type: 'like',
        commentId,
        userId: userId3,
      })

      const getCommentReactions = await service.getCommentReactionsByCommentId(
        commentId,
      )

      expect(getCommentReactions.ok).toBeTruthy()
      expect(getCommentReactions.message).toBe(
        'Comment reactions found successfully',
      )
      expect(getCommentReactions.payload).toHaveLength(3)
      expect(getCommentReactions.payload).toMatchObject(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            type: 'like',
            commentId,
            userId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            type: 'dislike',
            commentId,
            userId: userId2,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            type: 'like',
            commentId,
            userId: userId3,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })

    it('should return an empty array when try to get all comment reactions from a user that does not have any comment reaction', async () => {
      const getCommentReactions = await service.getCommentReactionsByUserId(
        userId,
      )

      expect(getCommentReactions.ok).toBeTruthy()
      expect(getCommentReactions.message).toBe(
        'Comment reactions found successfully',
      )
      expect(getCommentReactions.payload).toHaveLength(0)
      expect(getCommentReactions.payload).toStrictEqual([])
    })
  })

  describe('delete', () => {
    it('should delete a comment reaction', async () => {
      const commentReaction =
        await PrismaCommentReactionRepository.createCommentReaction({
          type: 'like',
          commentId,
          userId,
        })

      const deleteCommentReaction = await service.deleteCommentReaction(
        commentReaction.id,
        userId,
      )

      expect(deleteCommentReaction.ok).toBeTruthy()
      expect(deleteCommentReaction.message).toBe(
        'Comment reaction deleted successfully',
      )
      expect(deleteCommentReaction.payload).toBeUndefined()
    })

    it('should return an error when try to delete a comment reaction that does not exist', async () => {
      const deleteCommentReaction = await service.deleteCommentReaction(
        'non-existent-comment-reaction-id',
        userId,
      )

      expect(deleteCommentReaction.ok).toBeFalsy()
      expect(deleteCommentReaction.message).toContain('Comment reaction')
      expect(deleteCommentReaction.message).toContain('not found')
      expect(deleteCommentReaction.payload).toBeUndefined()
    })

    it('should not delete a comment reaction when user id is invalid', async () => {
      const commentReaction =
        await PrismaCommentReactionRepository.createCommentReaction({
          type: 'like',
          commentId,
          userId,
        })

      const deleteCommentReaction = await service.deleteCommentReaction(
        commentReaction.id,
        'another-user-id',
      )

      expect(deleteCommentReaction.ok).toBeFalsy()
      expect(deleteCommentReaction.message).toBe('Invalid user id')
      expect(deleteCommentReaction.payload).toBeUndefined()
    })
  })
})
