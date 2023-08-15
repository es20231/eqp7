import { instantiatedCommentReactionService } from '../../../src/factories/comment-reaction.factory'
import {
  clearCommentReactionsMemory,
  MemoryCommentReactionRepository,
} from '../../../src/repositories/implementations/memory/comment-reaction.repository'
import { MemoryCommentRepository } from '../../../src/repositories/implementations/memory/comment.repository'
import { MemoryImageRepository } from '../../../src/repositories/implementations/memory/image.repository'
import { MemoryPostRepository } from '../../../src/repositories/implementations/memory/post.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'

describe('MemoryCommentReactionService', () => {
  const service = instantiatedCommentReactionService(
    MemoryCommentReactionRepository,
    MemoryUserRepository,
    MemoryCommentRepository,
  )

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  let userId: string
  let imageId: string
  let postId: string
  let commentId: string

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
  })
})
