import {
  clearCommentReactionsMemory,
  MemoryCommentReactionRepository,
} from '../../../../src/repositories/implementations/memory/comment-reaction.repository'

describe('MemoryCommentReactionRepository', () => {
  const repository = MemoryCommentReactionRepository
  const userId = 'user-test-id'
  const commentId = 'comment-test-id'
  const userId2 = 'user-test-id-2'
  const commentId2 = 'comment-test-id-2'
  const userId3 = 'user-test-id-3'
  const commentId3 = 'comment-test-id-3'
  const userId4 = 'user-test-id-4'
  const commentId4 = 'comment-test-id-4'
  it('should be defined', () => {
    expect(repository).toBeTruthy()
  })
  afterEach(async () => await clearCommentReactionsMemory())
  it('should create a comment reaction', async () => {
    const createdCommentReaction = await repository.createCommentReaction({
      type: 'like',
      userId,
      commentId,
    })
    expect(createdCommentReaction).toBeTruthy()
    expect(createdCommentReaction).toStrictEqual({
      id: expect.any(String),
      type: createdCommentReaction.type,
      userId: createdCommentReaction.userId,
      commentId: createdCommentReaction.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get a comment reaction by id', async () => {
    const commentReaction = {
      type: 'like',
      userId,
      commentId,
    }

    const created = await repository.createCommentReaction(commentReaction)
    const { id } = created
    const found = await repository.getCommentReactionById(id)
    expect(found).toBeTruthy()
    expect(found).toStrictEqual({
      id,
      type: commentReaction.type,
      userId: commentReaction.userId,
      commentId: commentReaction.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return undefined when try to get a comment reaction by id that does not exist', async () => {
    const found = await repository.getCommentReactionById('invalid-id')
    expect(found).toBeUndefined()
  })

  it('should get all comment reactions', async () => {
    const commentReaction = {
      type: 'like',
      userId,
      commentId,
    }

    const commentReaction2 = {
      type: 'dislike',
      userId: userId2,
      commentId: commentId2,
    }

    const commentReaction3 = {
      type: 'dislike',
      userId: userId3,
      commentId: commentId3,
    }

    await repository.createCommentReaction(commentReaction)
    await repository.createCommentReaction(commentReaction2)
    await repository.createCommentReaction(commentReaction3)

    const found = await repository.getCommentReactions()
    expect(found).toBeTruthy()
    expect(found.length).toBe(3)

    expect(found[0]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction.type,
      userId: commentReaction.userId,
      commentId: commentReaction.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(found[1]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction2.type,
      userId: commentReaction2.userId,
      commentId: commentReaction2.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(found[2]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction3.type,
      userId: commentReaction3.userId,
      commentId: commentReaction3.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get all comment reactions with type like', async () => {
    const commentReaction = {
      type: 'like',
      userId,
      commentId,
    }

    const commentReaction2 = {
      type: 'dislike',
      userId: userId2,
      commentId: commentId2,
    }

    const commentReaction3 = {
      type: 'dislike',
      userId: userId3,
      commentId: commentId3,
    }

    await repository.createCommentReaction(commentReaction)
    await repository.createCommentReaction(commentReaction2)
    await repository.createCommentReaction(commentReaction3)

    const found = await repository.getCommentReactions('like')
    expect(found).toBeTruthy()
    expect(found.length).toBe(1)

    expect(found[0]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction.type,
      userId: commentReaction.userId,
      commentId: commentReaction.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get two comment reactions when try to get all comment reactions with take 2', async () => {
    const commentReaction = {
      type: 'like',
      userId,
      commentId,
    }

    const commentReaction2 = {
      type: 'dislike',
      userId: userId2,
      commentId: commentId2,
    }

    const commentReaction3 = {
      type: 'dislike',
      userId: userId3,
      commentId: commentId3,
    }

    const commentReaction4 = {
      type: 'dislike',
      userId: userId4,
      commentId: commentId4,
    }

    await repository.createCommentReaction(commentReaction)
    await repository.createCommentReaction(commentReaction2)
    await repository.createCommentReaction(commentReaction3)
    await repository.createCommentReaction(commentReaction4)

    const found = await repository.getCommentReactions(undefined, 2)
    expect(found).toBeTruthy()
    expect(found.length).toBe(2)

    expect(found[0]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction.type,
      userId: commentReaction.userId,
      commentId: commentReaction.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(found[1]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction2.type,
      userId: commentReaction2.userId,
      commentId: commentReaction2.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get two comment reactions when try to get all comment reactions with take 2 and skip 2', async () => {
    const commentReaction = {
      type: 'like',
      userId,
      commentId,
    }

    const commentReaction2 = {
      type: 'dislike',
      userId: userId2,
      commentId: commentId2,
    }

    const commentReaction3 = {
      type: 'dislike',
      userId: userId3,
      commentId: commentId3,
    }

    const commentReaction4 = {
      type: 'dislike',
      userId: userId4,
      commentId: commentId4,
    }

    await repository.createCommentReaction(commentReaction)
    await repository.createCommentReaction(commentReaction2)
    await repository.createCommentReaction(commentReaction3)
    await repository.createCommentReaction(commentReaction4)

    const found = await repository.getCommentReactions(undefined, 2, 2)
    expect(found).toBeTruthy()
    expect(found.length).toBe(2)

    expect(found[0]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction3.type,
      userId: commentReaction3.userId,
      commentId: commentReaction3.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(found[1]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction4.type,
      userId: commentReaction4.userId,
      commentId: commentReaction4.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get all coments reactions from a user', async () => {
    const commentReaction = {
      type: 'like',
      userId,
      commentId,
    }

    const commentReaction2 = {
      type: 'dislike',
      userId,
      commentId: commentId2,
    }

    const commentReaction3 = {
      type: 'dislike',
      userId,
      commentId: commentId3,
    }

    await repository.createCommentReaction(commentReaction)
    await repository.createCommentReaction(commentReaction2)
    await repository.createCommentReaction(commentReaction3)

    const found = await repository.getCommentReactionsByUserId(userId)
    expect(found).toBeTruthy()
    expect(found.length).toBe(3)

    expect(found[0]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction.type,
      userId: commentReaction.userId,
      commentId: commentReaction.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(found[1]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction2.type,
      userId: commentReaction2.userId,
      commentId: commentReaction2.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(found[2]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction3.type,
      userId: commentReaction3.userId,
      commentId: commentReaction3.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get all comments reactions from a user with type dislike', async () => {
    const commentReaction = {
      type: 'like',
      userId,
      commentId,
    }

    const commentReaction2 = {
      type: 'dislike',
      userId,
      commentId: commentId2,
    }

    const commentReaction3 = {
      type: 'dislike',
      userId,
      commentId: commentId3,
    }

    await repository.createCommentReaction(commentReaction)
    await repository.createCommentReaction(commentReaction2)
    await repository.createCommentReaction(commentReaction3)

    const found = await repository.getCommentReactionsByUserId(
      userId,
      'dislike',
    )
    expect(found).toBeTruthy()
    expect(found.length).toBe(2)

    expect(found[0]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction2.type,
      userId: commentReaction2.userId,
      commentId: commentReaction2.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(found[1]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction3.type,
      userId: commentReaction3.userId,
      commentId: commentReaction3.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get two comment reactions when try to get all comment reactions from a user with take 2', async () => {
    const commentReaction = {
      type: 'like',
      userId,
      commentId,
    }

    const commentReaction2 = {
      type: 'dislike',
      userId,
      commentId: commentId2,
    }

    const commentReaction3 = {
      type: 'dislike',
      userId,
      commentId: commentId3,
    }

    const commentReaction4 = {
      type: 'dislike',
      userId,
      commentId: commentId4,
    }

    await repository.createCommentReaction(commentReaction)
    await repository.createCommentReaction(commentReaction2)
    await repository.createCommentReaction(commentReaction3)
    await repository.createCommentReaction(commentReaction4)

    const found = await repository.getCommentReactionsByUserId(
      userId,
      undefined,
      2,
    )
    expect(found).toBeTruthy()
    expect(found.length).toBe(2)

    expect(found[0]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction.type,
      userId: commentReaction.userId,
      commentId: commentReaction.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(found[1]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction2.type,
      userId: commentReaction2.userId,
      commentId: commentReaction2.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get all comment reactions from a comment', async () => {
    const commentReaction = {
      type: 'like',
      userId,
      commentId,
    }

    const commentReaction2 = {
      type: 'dislike',
      userId: userId2,
      commentId,
    }

    const commentReaction3 = {
      type: 'dislike',
      userId: userId3,
      commentId,
    }

    await repository.createCommentReaction(commentReaction)
    await repository.createCommentReaction(commentReaction2)
    await repository.createCommentReaction(commentReaction3)

    const found = await repository.getCommentReactionsByCommentId(commentId)
    expect(found).toBeTruthy()
    expect(found.length).toBe(3)

    expect(found[0]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction.type,
      userId: commentReaction.userId,
      commentId: commentReaction.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(found[1]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction2.type,
      userId: commentReaction2.userId,
      commentId: commentReaction2.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(found[2]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction3.type,
      userId: commentReaction3.userId,
      commentId: commentReaction3.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get all comments reactions from a comment with type dislike', async () => {
    const commentReaction = {
      type: 'like',
      userId,
      commentId,
    }

    const commentReaction2 = {
      type: 'dislike',
      userId: userId2,
      commentId,
    }

    const commentReaction3 = {
      type: 'dislike',
      userId: userId3,
      commentId,
    }

    await repository.createCommentReaction(commentReaction)
    await repository.createCommentReaction(commentReaction2)
    await repository.createCommentReaction(commentReaction3)

    const found = await repository.getCommentReactionsByCommentId(
      commentId,
      'dislike',
    )
    expect(found).toBeTruthy()
    expect(found.length).toBe(2)

    expect(found[0]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction2.type,
      userId: commentReaction2.userId,
      commentId: commentReaction2.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(found[1]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction3.type,
      userId: commentReaction3.userId,
      commentId: commentReaction3.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get two comment reactions when try to get all comment reactions from a comment with take 2', async () => {
    const commentReaction = {
      type: 'like',
      userId,
      commentId,
    }

    const commentReaction2 = {
      type: 'dislike',
      userId: userId2,
      commentId,
    }

    const commentReaction3 = {
      type: 'dislike',
      userId: userId3,
      commentId,
    }

    const commentReaction4 = {
      type: 'dislike',
      userId: userId4,
      commentId,
    }

    await repository.createCommentReaction(commentReaction)
    await repository.createCommentReaction(commentReaction2)
    await repository.createCommentReaction(commentReaction3)
    await repository.createCommentReaction(commentReaction4)

    const found = await repository.getCommentReactionsByCommentId(
      commentId,
      undefined,
      2,
    )
    expect(found).toBeTruthy()
    expect(found.length).toBe(2)

    expect(found[0]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction.type,
      userId: commentReaction.userId,
      commentId: commentReaction.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(found[1]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction2.type,
      userId: commentReaction2.userId,
      commentId: commentReaction2.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get two comments reactions when try to get all comment reactions from a post with take 2 and skip 2', async () => {
    const commentReaction = {
      type: 'like',
      userId,
      commentId,
    }

    const commentReaction2 = {
      type: 'dislike',
      userId: userId2,
      commentId,
    }

    const commentReaction3 = {
      type: 'dislike',
      userId: userId3,
      commentId,
    }

    const commentReaction4 = {
      type: 'dislike',
      userId: userId4,
      commentId,
    }

    await repository.createCommentReaction(commentReaction)
    await repository.createCommentReaction(commentReaction2)
    await repository.createCommentReaction(commentReaction3)
    await repository.createCommentReaction(commentReaction4)

    const found = await repository.getCommentReactionsByCommentId(
      commentId,
      undefined,
      2,
      2,
    )
    expect(found).toBeTruthy()
    expect(found.length).toBe(2)

    expect(found[0]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction3.type,
      userId: commentReaction3.userId,
      commentId: commentReaction3.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(found[1]).toStrictEqual({
      id: expect.any(String),
      type: commentReaction4.type,
      userId: commentReaction4.userId,
      commentId: commentReaction4.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should delete a comment reaction by id', async () => {
    const commentReaction = {
      type: 'like',
      userId,
      commentId,
    }

    const created = await repository.createCommentReaction(commentReaction)
    expect(created).toBeTruthy()

    const deleted = await repository.deleteCommentReaction(created.id)
    expect(deleted).toBeTruthy()
    expect(deleted).toStrictEqual({
      id: expect.any(String),
      type: commentReaction.type,
      userId: commentReaction.userId,
      commentId: commentReaction.commentId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should throw an error when try to delete a comment reaction with an invalid id', async () => {
    await expect(repository.deleteCommentReaction('invalid')).rejects.toThrow()
  })
})
