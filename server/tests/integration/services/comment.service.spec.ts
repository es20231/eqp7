import { instantiatedCommentService } from '../../../src/factories/comment.factory'
import {
  clearCommentMemory,
  MemoryCommentRepository,
} from '../../../src/repositories/implementations/memory/comment.repository'
import { MemoryImageRepository } from '../../../src/repositories/implementations/memory/image.repository'
import { MemoryPostRepository } from '../../../src/repositories/implementations/memory/post.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'

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
  })
})
