import { instantiatedPostReactionService } from '../../../src/factories/post-reaction.factory'
import { MemoryPostReactionRepository } from '../../../src/repositories/implementations/memory/post-reaction.repository'
import { MemoryPostRepository } from '../../../src/repositories/implementations/memory/post.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'

describe('Post Reaction Factory', () => {
  const service = instantiatedPostReactionService(
    MemoryPostReactionRepository,
    MemoryUserRepository,
    MemoryPostRepository,
  )
  it('should to be defined', () => {
    expect(service).toBeDefined()
  })

  it('should to be all methods defined', () => {
    expect(service.getPostReactions).toBeDefined()
    expect(service.getPostReactionById).toBeDefined()
    expect(service.getPostReactionsByPostId).toBeDefined()
    expect(service.getPostReactionsByUserId).toBeDefined()
    expect(service.createPostReaction).toBeDefined()
    expect(service.deletePostReaction).toBeDefined()
  })
})
