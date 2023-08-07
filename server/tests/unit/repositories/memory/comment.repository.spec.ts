import {
  clearCommentMemory,
  MemoryCommentRepository,
} from '../../../../src/repositories/implementations/memory/comment.repository'

describe('MemoryCommentRepository', () => {
  const repository = MemoryCommentRepository
  const userId = 'user-test-id'
  const postId = 'post-test-id'
  it('should be defined', () => {
    expect(repository).toBeTruthy()
  })
  afterEach(() => {
    clearCommentMemory()
  })
  it('should create a comment', async () => {
    const comment = {
      content: 'Comment Content',
      userId,
      postId,
    }
    const created = await repository.createComment(comment)
    expect(created).toBeTruthy()
    expect(created).toStrictEqual({
      id: expect.any(String),
      content: comment.content,
      userId: comment.userId,
      postId: comment.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
  it('should get a comment by id', async () => {
    const comment = {
      content: 'Comment Content',
      userId,
      postId,
    }
    const created = await repository.createComment(comment)
    const { id } = created
    const finded = await repository.getCommentById(id)
    expect(finded).toBeTruthy()
    expect(finded).toStrictEqual({
      id,
      content: comment.content,
      userId: comment.userId,
      postId: comment.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
  it('should return undefined when try to get a comment by non existent id', async () => {
    const comment = await repository.getCommentById('non-existent-id')
    expect(comment).toBeUndefined()
  })
  it('should get all comments', async () => {
    const comment1 = {
      content: 'Comment Content',
      userId,
      postId,
    }
    const comment2 = {
      content: 'Comment Content',
      userId,
      postId,
    }
    const comment3 = {
      content: 'Comment Content',
      userId,
      postId,
    }
    await repository.createComment(comment1)
    await repository.createComment(comment2)
    await repository.createComment(comment3)
    const comments = await repository.getComments()
    expect(comments).toBeTruthy()
    expect(comments.length).toBe(3)
    expect(comments[0]).toStrictEqual({
      id: expect.any(String),
      content: comment1.content,
      userId: comment1.userId,
      postId: comment1.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(comments[1]).toStrictEqual({
      id: expect.any(String),
      content: comment2.content,
      userId: comment2.userId,
      postId: comment2.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(comments[2]).toStrictEqual({
      id: expect.any(String),
      content: comment3.content,
      userId: comment3.userId,
      postId: comment3.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
  it('should get all comments from a post', async () => {
    const comment1 = {
      content: 'Comment Content',
      userId,
      postId,
    }
    const comment2 = {
      content: 'Comment Content',
      userId,
      postId,
    }
    const comment3 = {
      content: 'Comment Content',
      userId,
      postId,
    }
    await repository.createComment(comment1)
    await repository.createComment(comment2)
    await repository.createComment(comment3)
    const comments = await repository.getCommentsByPostId(postId)
    expect(comments).toBeTruthy()
    expect(comments.length).toBe(3)
    expect(comments[0]).toStrictEqual({
      id: expect.any(String),
      content: comment1.content,
      userId: comment1.userId,
      postId: comment1.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(comments[1]).toStrictEqual({
      id: expect.any(String),
      content: comment2.content,
      userId: comment2.userId,
      postId: comment2.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(comments[2]).toStrictEqual({
      id: expect.any(String),
      content: comment3.content,
      userId: comment3.userId,
      postId: comment3.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
  it('should get all comments from a user', async () => {
    const comment1 = {
      content: 'Comment Content',
      userId,
      postId,
    }
    const comment2 = {
      content: 'Comment Content',
      userId,
      postId,
    }
    const comment3 = {
      content: 'Comment Content',
      userId,
      postId,
    }
    await repository.createComment(comment1)
    await repository.createComment(comment2)
    await repository.createComment(comment3)
    const comments = await repository.getCommentsByUserId(userId)
    expect(comments).toBeTruthy()
    expect(comments.length).toBe(3)
    expect(comments[0]).toStrictEqual({
      id: expect.any(String),
      content: comment1.content,
      userId: comment1.userId,
      postId: comment1.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(comments[1]).toStrictEqual({
      id: expect.any(String),
      content: comment2.content,
      userId: comment2.userId,
      postId: comment2.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(comments[2]).toStrictEqual({
      id: expect.any(String),
      content: comment3.content,
      userId: comment3.userId,
      postId: comment3.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
  it('should delete a comment by id', async () => {
    const comment = {
      content: 'Comment Content',
      userId,
      postId,
    }
    const created = await repository.createComment(comment)
    const { id } = created
    const deleted = await repository.deleteComment(id)
    expect(deleted).toBeTruthy()
    expect(deleted).toStrictEqual({
      id,
      content: comment.content,
      userId: comment.userId,
      postId: comment.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
  it('should throw an error when try to delete a comment by non existent id', async () => {
    await expect(repository.deleteComment('non-existent-id')).rejects.toThrow()
  })
})
