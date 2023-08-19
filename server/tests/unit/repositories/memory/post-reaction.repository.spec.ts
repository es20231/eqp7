import {
  clearPostReactionsMemory,
  MemoryPostReactionRepository,
} from '../../../../src/repositories/implementations/memory/post-reaction.repository'

describe('MemoryPostReactionRepository', () => {
  const repository = MemoryPostReactionRepository
  const userId = 'user-test-id'
  const postId = 'post-test-id'
  const userId2 = 'user-test-id-2'
  const postId2 = 'post-test-id-2'
  const userId3 = 'user-test-id-3'
  const postId3 = 'post-test-id-3'
  it('should be defined', () => {
    expect(repository).toBeTruthy()
  })
  afterEach(async () => await clearPostReactionsMemory())
  it('should create a post reaction', async () => {
    const createdPostReaction = await repository.createPostReaction({
      type: 'like',
      userId,
      postId,
    })
    expect(createdPostReaction).toBeTruthy()
    expect(createdPostReaction).toStrictEqual({
      id: expect.any(String),
      type: createdPostReaction.type,
      userId: createdPostReaction.userId,
      postId: createdPostReaction.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get a post reaction by id', async () => {
    const postReaction = {
      type: 'like',
      userId,
      postId,
    }

    const created = await repository.createPostReaction(postReaction)
    const { id } = created
    const found = await repository.getPostReactionById(id)
    expect(found).toBeTruthy()
    expect(found).toStrictEqual({
      id,
      type: postReaction.type,
      userId: postReaction.userId,
      postId: postReaction.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return undefined when try to get a post reaction by id that does not exist', async () => {
    const found = await repository.getPostReactionById('invalid-id')
    expect(found).toBeUndefined()
  })

  it('should get all post reactions', async () => {
    const postReaction = {
      type: 'like',
      userId,
      postId,
    }

    const postReaction2 = {
      type: 'dislike',
      userId: userId2,
      postId: postId2,
    }

    const postReaction3 = {
      type: 'like',
      userId: userId3,
      postId: postId3,
    }

    await repository.createPostReaction(postReaction)
    await repository.createPostReaction(postReaction2)
    await repository.createPostReaction(postReaction3)

    const found = await repository.getPostReactions()
    expect(found).toBeTruthy()
    expect(found).toHaveLength(3)
    expect(found).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction.type,
          userId: postReaction.userId,
          postId: postReaction.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction2.type,
          userId: postReaction2.userId,
          postId: postReaction2.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction3.type,
          userId: postReaction3.userId,
          postId: postReaction3.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    )
  })

  it('should get all posts reactions with type like', async () => {
    const postReaction = {
      type: 'like',
      userId,
      postId,
    }

    const postReaction2 = {
      type: 'dislike',
      userId: userId2,
      postId: postId2,
    }

    const postReaction3 = {
      type: 'like',
      userId: userId3,
      postId: postId3,
    }

    await repository.createPostReaction(postReaction)
    await repository.createPostReaction(postReaction2)
    await repository.createPostReaction(postReaction3)

    const found = await repository.getPostReactions('like')
    expect(found).toBeTruthy()
    expect(found).toHaveLength(2)
    expect(found).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction.type,
          userId: postReaction.userId,
          postId: postReaction.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction3.type,
          userId: postReaction3.userId,
          postId: postReaction3.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    )
  })

  it('should get two post reactions when try to get all post reactions with take 2', async () => {
    const postReaction = {
      type: 'like',
      userId,
      postId,
    }

    const postReaction2 = {
      type: 'dislike',
      userId: userId2,
      postId: postId2,
    }

    const postReaction3 = {
      type: 'like',
      userId: userId3,
      postId: postId3,
    }

    await repository.createPostReaction(postReaction)
    await repository.createPostReaction(postReaction2)
    await repository.createPostReaction(postReaction3)

    const found = await repository.getPostReactions(undefined, 2)
    expect(found).toBeTruthy()
    expect(found).toHaveLength(2)
    expect(found).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction.type,
          userId: postReaction.userId,
          postId: postReaction.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction2.type,
          userId: postReaction2.userId,
          postId: postReaction2.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    )
  })

  it('should get two post reactions when try to get all post reactions with take 2 and skip 2', async () => {
    const postReaction = {
      type: 'like',
      userId,
      postId,
    }

    const postReaction2 = {
      type: 'dislike',
      userId: userId2,
      postId: postId2,
    }

    const postReaction3 = {
      type: 'like',
      userId: userId3,
      postId: postId3,
    }

    await repository.createPostReaction(postReaction)
    await repository.createPostReaction(postReaction2)
    await repository.createPostReaction(postReaction3)

    const found = await repository.getPostReactions(undefined, 2, 2)
    expect(found).toBeTruthy()
    expect(found).toHaveLength(1)
    expect(found).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction3.type,
          userId: postReaction3.userId,
          postId: postReaction3.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    )
  })

  it('should get all posts reactions from a user', async () => {
    const postReaction = {
      type: 'like',
      userId,
      postId,
    }

    const postReaction2 = {
      type: 'dislike',
      userId,
      postId: postId2,
    }

    const postReaction3 = {
      type: 'like',
      userId,
      postId: postId3,
    }

    await repository.createPostReaction(postReaction)
    await repository.createPostReaction(postReaction2)
    await repository.createPostReaction(postReaction3)

    const found = await repository.getPostReactionsByUserId(userId)
    expect(found).toBeTruthy()
    expect(found).toHaveLength(3)
    expect(found).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction.type,
          userId: postReaction.userId,
          postId: postReaction.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction2.type,
          userId: postReaction2.userId,
          postId: postReaction2.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction3.type,
          userId: postReaction3.userId,
          postId: postReaction3.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    )
  })

  it('should get all post reactions from a user with type like', async () => {
    const postReaction = {
      type: 'like',
      userId,
      postId,
    }

    const postReaction2 = {
      type: 'dislike',
      userId,
      postId: postId2,
    }

    const postReaction3 = {
      type: 'like',
      userId,
      postId: postId3,
    }

    await repository.createPostReaction(postReaction)
    await repository.createPostReaction(postReaction2)
    await repository.createPostReaction(postReaction3)

    const found = await repository.getPostReactionsByUserId(userId, 'like')
    expect(found).toBeTruthy()
    expect(found).toHaveLength(2)
    expect(found).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction.type,
          userId: postReaction.userId,
          postId: postReaction.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction3.type,
          userId: postReaction3.userId,
          postId: postReaction3.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    )
  })

  it('should get two post reactions when try to get all posts reactions from a user with take 2', async () => {
    const postReaction = {
      type: 'like',
      userId,
      postId,
    }

    const postReaction2 = {
      type: 'dislike',
      userId,
      postId: postId2,
    }

    const postReaction3 = {
      type: 'like',
      userId,
      postId: postId3,
    }

    await repository.createPostReaction(postReaction)
    await repository.createPostReaction(postReaction2)
    await repository.createPostReaction(postReaction3)

    const found = await repository.getPostReactionsByUserId(
      userId,
      undefined,
      2,
    )
    expect(found).toBeTruthy()
    expect(found).toHaveLength(2)
    expect(found).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction.type,
          userId: postReaction.userId,
          postId: postReaction.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction2.type,
          userId: postReaction2.userId,
          postId: postReaction2.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    )
  })

  it('should get all post reactions from a post', async () => {
    const postReaction = {
      type: 'like',
      userId,
      postId,
    }

    const postReaction2 = {
      type: 'dislike',
      userId: userId2,
      postId,
    }

    const postReaction3 = {
      type: 'like',
      userId: userId3,
      postId,
    }

    await repository.createPostReaction(postReaction)
    await repository.createPostReaction(postReaction2)
    await repository.createPostReaction(postReaction3)

    const found = await repository.getPostReactionsByPostId(postId)
    expect(found).toBeTruthy()
    expect(found).toHaveLength(3)
    expect(found).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction.type,
          userId: postReaction.userId,
          postId: postReaction.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction2.type,
          userId: postReaction2.userId,
          postId: postReaction2.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction3.type,
          userId: postReaction3.userId,
          postId: postReaction3.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    )
  })

  it('should get all post reactions from a post with type like', async () => {
    const postReaction = {
      type: 'like',
      userId,
      postId,
    }

    const postReaction2 = {
      type: 'dislike',
      userId: userId2,
      postId,
    }

    const postReaction3 = {
      type: 'like',
      userId: userId3,
      postId,
    }

    await repository.createPostReaction(postReaction)
    await repository.createPostReaction(postReaction2)
    await repository.createPostReaction(postReaction3)

    const found = await repository.getPostReactionsByPostId(postId, 'like')
    expect(found).toBeTruthy()
    expect(found).toHaveLength(2)
    expect(found).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction.type,
          userId: postReaction.userId,
          postId: postReaction.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction3.type,
          userId: postReaction3.userId,
          postId: postReaction3.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    )
  })

  it('should get two post reactions when try to get all post reactions from a post with take 2', async () => {
    const postReaction = {
      type: 'like',
      userId,
      postId,
    }

    const postReaction2 = {
      type: 'dislike',
      userId: userId2,
      postId,
    }

    const postReaction3 = {
      type: 'like',
      userId: userId3,
      postId,
    }

    await repository.createPostReaction(postReaction)
    await repository.createPostReaction(postReaction2)
    await repository.createPostReaction(postReaction3)

    const found = await repository.getPostReactionsByPostId(
      postId,
      undefined,
      2,
    )
    expect(found).toBeTruthy()
    expect(found).toHaveLength(2)
    expect(found).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction.type,
          userId: postReaction.userId,
          postId: postReaction.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction2.type,
          userId: postReaction2.userId,
          postId: postReaction2.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    )
  })

  it('should get two post reactions when try to get all posts reactions from a post with take 2 and skip 2', async () => {
    const postReaction = {
      type: 'like',
      userId,
      postId,
    }

    const postReaction2 = {
      type: 'dislike',
      userId: userId2,
      postId,
    }

    const postReaction3 = {
      type: 'like',
      userId: userId3,
      postId,
    }

    await repository.createPostReaction(postReaction)
    await repository.createPostReaction(postReaction2)
    await repository.createPostReaction(postReaction3)

    const found = await repository.getPostReactionsByPostId(
      postId,
      undefined,
      2,
      2,
    )
    expect(found).toBeTruthy()
    expect(found).toHaveLength(1)
    expect(found).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          type: postReaction3.type,
          userId: postReaction3.userId,
          postId: postReaction3.postId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    )
  })

  it('should delete a post reaction by id', async () => {
    const postReaction = {
      type: 'like',
      userId,
      postId,
    }

    const created = await repository.createPostReaction(postReaction)
    expect(created).toBeTruthy()

    const deleted = await repository.deletePostReaction(created.id)
    expect(deleted).toBeTruthy()
    expect(deleted).toStrictEqual(
      expect.objectContaining({
        id: expect.any(String),
        type: postReaction.type,
        userId: postReaction.userId,
        postId: postReaction.postId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    )
  })

  it('should throw an error when try to delete a post reaction that does not exist', async () => {
    await expect(repository.deletePostReaction('123')).rejects.toThrow()
  })
})
