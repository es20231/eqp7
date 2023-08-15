import { instantiatedPostReactionService } from '../../../src/factories/post-reaction.factory'
import { MemoryImageRepository } from '../../../src/repositories/implementations/memory/image.repository'
import {
  clearPostReactionsMemory,
  MemoryPostReactionRepository,
} from '../../../src/repositories/implementations/memory/post-reaction.repository'
import { MemoryPostRepository } from '../../../src/repositories/implementations/memory/post.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'

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
  })
})
