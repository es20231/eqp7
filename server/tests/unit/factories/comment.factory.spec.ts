import { instantiatedCommentService } from '../../../src/factories/comment.factory'
import { MemoryCommentRepository } from '../../../src/repositories/implementations/memory/comment.repository'
import { MemoryPostRepository } from '../../../src/repositories/implementations/memory/post.repository'
import { MemoryUserRepository } from '../../../src/repositories/implementations/memory/user.repository'

describe('Comment Factory', () => {
  const service = instantiatedCommentService(
    MemoryCommentRepository,
    MemoryUserRepository,
    MemoryPostRepository,
  )
  it('should to be defined', () => {
    expect(service).toBeDefined()
  })

  it('should to be all methods defined', () => {
    expect(service.getComments).toBeDefined()
    expect(service.getCommentById).toBeDefined()
    expect(service.getCommentsByPostId).toBeDefined()
    expect(service.getCommentsByUserId).toBeDefined()
    expect(service.createComment).toBeDefined()
    expect(service.deleteComment).toBeDefined()
  })
})
