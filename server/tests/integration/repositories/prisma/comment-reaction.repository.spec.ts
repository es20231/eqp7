import { prisma } from '../../../../src/lib/prisma'
import {
  clearCommentReactionsPrisma,
  PrismaCommentReactionRepository,
} from '../../../../src/repositories/implementations/prisma/comment-reaction.repository'

describe('PrismaCommentReactionRepository', () => {
  const repository = PrismaCommentReactionRepository
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

  it('should be defined', () => {
    expect(repository).toBeTruthy()
  })

  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        username: 'jose',
        email: 'jose@mail.com',
        fullName: 'Jose Augusto',
        password: 'test',
      },
    })
    userId = user.id

    const image = await prisma.image.create({
      data: {
        url: 'https://github.com/JoseeAugusto.png',
        userId,
      },
    })
    imageId = image.id

    const post = await prisma.post.create({
      data: {
        subtitle: 'post test',
        userId,
        imageId,
      },
    })
    postId = post.id

    const comment = await prisma.comment.create({
      data: {
        content: 'comment test',
        userId,
        postId,
      },
    })
    commentId = comment.id

    const user2 = await prisma.user.create({
      data: {
        username: 'jose2',
        email: 'jose2@mail.com',
        fullName: 'Jose Junior',
        password: 'test',
      },
    })
    userId2 = user2.id

    const image2 = await prisma.image.create({
      data: {
        url: 'https://github.com/JoseeAugusto.png',
        userId: userId2,
      },
    })
    imageId2 = image2.id

    const post2 = await prisma.post.create({
      data: {
        subtitle: 'post test2',
        userId: userId2,
        imageId: imageId2,
      },
    })
    postId2 = post2.id

    const comment2 = await prisma.comment.create({
      data: {
        content: 'comment test 2',
        userId: userId2,
        postId,
      },
    })
    commentId2 = comment2.id

    const user3 = await prisma.user.create({
      data: {
        username: 'jose3',
        email: 'jose3@mail.com',
        fullName: 'Jose Juninho',
        password: 'test',
      },
    })
    userId3 = user3.id

    const image3 = await prisma.image.create({
      data: {
        url: 'https://github.com/JoseeAugusto.png',
        userId: userId3,
      },
    })
    imageId3 = image3.id

    const post3 = await prisma.post.create({
      data: {
        subtitle: 'post test3',
        userId: userId3,
        imageId: imageId3,
      },
    })
    postId3 = post3.id

    const comment3 = await prisma.comment.create({
      data: {
        content: 'comment test 3',
        userId: userId3,
        postId,
      },
    })
    commentId3 = comment3.id
  })

  afterAll(async () => {
    await prisma.comment.deleteMany()
    await prisma.post.deleteMany()
    await prisma.image.deleteMany()
    await prisma.user.deleteMany()
  })

  afterEach(async () => {
    clearCommentReactionsPrisma()
  })

  it('should create a comment reaction', async () => {
    const commentReaction = await repository.createCommentReaction({
      type: 'like',
      commentId,
      userId,
    })

    expect(commentReaction).toBeTruthy()
    expect(commentReaction.type).toBe('like')
    expect(commentReaction.commentId).toBe(commentId)
    expect(commentReaction.userId).toBe(userId)
  })

  it('should throw error when try to create a comment reaction with invalid comment id', async () => {
    await expect(
      repository.createCommentReaction({
        type: 'like',
        commentId: 'invalid_comment_id',
        userId,
      }),
    ).rejects.toThrow()
  })

  it('should throw error when try to create a comment reaction with invalid user id', async () => {
    await expect(
      repository.createCommentReaction({
        type: 'like',
        commentId,
        userId: 'invalid_user_id',
      }),
    ).rejects.toThrow()
  })

  it('should get all comment reactions', async () => {
    await repository.createCommentReaction({
      type: 'like',
      commentId,
      userId,
    })

    await repository.createCommentReaction({
      type: 'like',
      commentId: commentId2,
      userId: userId2,
    })

    await repository.createCommentReaction({
      type: 'dislike',
      commentId: commentId3,
      userId: userId3,
    })

    const commentReactions = await repository.getCommentReactions()

    expect(commentReactions).toBeTruthy()
    expect(commentReactions.length).toBe(3)
    expect(commentReactions[0]).toStrictEqual({
      id: expect.any(String),
      type: 'like',
      commentId,
      userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(commentReactions[1]).toStrictEqual({
      id: expect.any(String),
      type: 'like',
      commentId: commentId2,
      userId: userId2,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(commentReactions[2]).toStrictEqual({
      id: expect.any(String),
      type: 'dislike',
      commentId: commentId3,
      userId: userId3,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get all comment reactions with type like', async () => {
    await repository.createCommentReaction({
      type: 'like',
      commentId,
      userId,
    })

    await repository.createCommentReaction({
      type: 'like',
      commentId: commentId2,
      userId: userId2,
    })

    await repository.createCommentReaction({
      type: 'dislike',
      commentId: commentId3,
      userId: userId3,
    })

    const commentReactions = await repository.getCommentReactions('like')

    expect(commentReactions).toBeTruthy()
    expect(commentReactions.length).toBe(2)
    expect(commentReactions[0]).toStrictEqual({
      id: expect.any(String),
      type: 'like',
      commentId,
      userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(commentReactions[1]).toStrictEqual({
      id: expect.any(String),
      type: 'like',
      commentId: commentId2,
      userId: userId2,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get two comments reactions when try to get all comment reactions with take 2', async () => {
    await repository.createCommentReaction({
      type: 'like',
      commentId,
      userId,
    })

    await repository.createCommentReaction({
      type: 'like',
      commentId: commentId2,
      userId: userId2,
    })

    await repository.createCommentReaction({
      type: 'dislike',
      commentId: commentId3,
      userId: userId3,
    })

    const commentReactions = await repository.getCommentReactions(undefined, 2)

    expect(commentReactions).toBeTruthy()
    expect(commentReactions.length).toBe(2)
    expect(commentReactions[0]).toStrictEqual({
      id: expect.any(String),
      type: 'like',
      commentId,
      userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(commentReactions[1]).toStrictEqual({
      id: expect.any(String),
      type: 'like',
      commentId: commentId2,
      userId: userId2,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get two comments reactions when try to get all comment reactions with skip 1 and take 2', async () => {
    await repository.createCommentReaction({
      type: 'like',
      commentId,
      userId,
    })

    await repository.createCommentReaction({
      type: 'like',
      commentId: commentId2,
      userId: userId2,
    })

    await repository.createCommentReaction({
      type: 'dislike',
      commentId: commentId3,
      userId: userId3,
    })

    const commentReactions = await repository.getCommentReactions(
      undefined,
      2,
      1,
    )

    expect(commentReactions).toBeTruthy()
    expect(commentReactions.length).toBe(2)
    expect(commentReactions[0]).toStrictEqual({
      id: expect.any(String),
      type: 'like',
      commentId: commentId2,
      userId: userId2,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(commentReactions[1]).toStrictEqual({
      id: expect.any(String),
      type: 'dislike',
      commentId: commentId3,
      userId: userId3,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get all comments reactions from a comment', async () => {
    const commentReaction = await repository.createCommentReaction({
      type: 'like',
      commentId,
      userId,
    })

    const commentReactions = await repository.getCommentReactionsByCommentId(
      commentId,
    )

    expect(commentReactions).toBeTruthy()
    expect(commentReactions.length).toBe(1)
    expect(commentReactions[0]).toStrictEqual({
      id: commentReaction.id,
      type: 'like',
      commentId,
      userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get all comments reactions from a user', async () => {
    const commentReaction = await repository.createCommentReaction({
      type: 'like',
      commentId,
      userId,
    })

    const commentReactions = await repository.getCommentReactionsByUserId(
      userId,
    )

    expect(commentReactions).toBeTruthy()
    expect(commentReactions.length).toBe(1)
    expect(commentReactions[0]).toStrictEqual({
      id: commentReaction.id,
      type: 'like',
      commentId,
      userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get an empty array when try to get all comments reactions from a comment that does not have any comment reaction', async () => {
    const commentReactions = await repository.getCommentReactionsByCommentId(
      commentId,
    )

    expect(commentReactions).toBeTruthy()
    expect(commentReactions.length).toBe(0)
  })

  it('should get an empty array when try to get all comments reactions from a user that does not have any comment reaction', async () => {
    const commentReactions = await repository.getCommentReactionsByUserId(
      userId,
    )

    expect(commentReactions).toBeTruthy()
    expect(commentReactions.length).toBe(0)
  })

  it('should get a comment reaction by id', async () => {
    const commentReaction = await repository.createCommentReaction({
      type: 'like',
      commentId,
      userId,
    })

    const commentReactionFound = await repository.getCommentReactionById(
      commentReaction.id,
    )

    expect(commentReactionFound).toBeTruthy()
    expect(commentReactionFound).toStrictEqual({
      id: commentReaction.id,
      type: 'like',
      commentId,
      userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return undefined when try to get a comment reaction by id that does not exists', async () => {
    const commentReactionFound = await repository.getCommentReactionById(
      commentId,
    )

    expect(commentReactionFound).toBeUndefined()
  })

  it('should delete a comment reaction by id', async () => {
    const commentReaction = await repository.createCommentReaction({
      type: 'like',
      commentId,
      userId,
    })

    const deleted = await repository.deleteCommentReaction(commentReaction.id)

    expect(deleted).toBeTruthy()
    expect(deleted).toStrictEqual({
      id: commentReaction.id,
      type: 'like',
      commentId,
      userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should throw an error when try to delete a comment reaction by id that does not exists', async () => {
    await expect(repository.deleteCommentReaction(commentId)).rejects.toThrow()
  })
})
