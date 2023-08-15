import { instantiatedCommentReactionService } from '../../../src/factories/comment-reaction.factory'
import { MemoryCommentReactionRepository } from '../../../src/repositories/implementations/memory/comment-reaction.repository'
import { MemoryCommentRepository } from '../../../src/repositories/implementations/memory/comment.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'

describe('Comment Reaction Factory', () => {
  const service = instantiatedCommentReactionService(
    MemoryCommentReactionRepository,
    MemoryUserRepository,
    MemoryCommentRepository,
  )
  it('should to be defined', () => {
    expect(service).toBeDefined()
  })

  it('should to be all methods defined', () => {
    expect(service.getCommentReactions).toBeDefined()
    expect(service.getCommentReactionById).toBeDefined()
    expect(service.getCommentReactionsByCommentId).toBeDefined()
    expect(service.getCommentReactionsByUserId).toBeDefined()
    expect(service.createCommentReaction).toBeDefined()
    expect(service.deleteCommentReaction).toBeDefined()
  })
})
