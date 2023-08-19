import { clearPrismaDatabase, prisma } from '../../../../src/lib/prisma'
import {
  PrismaPostReactionRepository,
  clearPostReactionsPrisma,
} from '../../../../src/repositories/implementations/prisma/post-reaction.repository'

describe('PrismaPostReactionRepository', () => {
  const repository = PrismaPostReactionRepository
  let userId: string
  let imageId: string
  let postId: string

  let userId2: string
  let imageId2: string
  let postId2: string

  let userId3: string
  let imageId3: string
  let postId3: string

  it('should be defined', () => {
    expect(repository).toBeTruthy()
  })

  beforeAll(async () => {
    await clearPrismaDatabase()
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
  })

  afterAll(async () => {
    await prisma.post.deleteMany()
    await prisma.image.deleteMany()
    await prisma.user.deleteMany()
  })

  afterEach(async () => {
    await clearPostReactionsPrisma()
  })

  it('should be defined', () => {
    expect(repository).toBeTruthy()
  })

  it('should create a post reaction', async () => {
    const reaction = await repository.createPostReaction({
      type: 'like',
      userId,
      postId,
    })

    expect(reaction).toBeTruthy()
    expect(reaction.type).toBe('like')
    expect(reaction.userId).toBe(userId)
    expect(reaction.postId).toBe(postId)
  })

  it('should throw an error when trying to create a post reaction with an invalid user id', async () => {
    await expect(
      repository.createPostReaction({
        type: 'like',
        userId: 'invalid-user-id',
        postId,
      }),
    ).rejects.toThrow()
  })

  it('should throw an error when trying to create a post reaction with an invalid post id', async () => {
    await expect(
      repository.createPostReaction({
        type: 'like',
        userId,
        postId: 'invalid-post-id',
      }),
    ).rejects.toThrow()
  })

  it('should get all post reactions', async () => {
    await repository.createPostReaction({
      type: 'like',
      userId,
      postId,
    })

    await repository.createPostReaction({
      type: 'dislike',
      userId: userId2,
      postId: postId2,
    })

    await repository.createPostReaction({
      type: 'like',
      userId: userId3,
      postId: postId3,
    })

    const reactions = await repository.getPostReactions()

    expect(reactions).toBeTruthy()
    expect(reactions.length).toBe(3)
    expect(reactions[0]).toMatchObject({
      id: expect.any(String),
      type: 'like',
      userId,
      postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(reactions[1]).toMatchObject({
      id: expect.any(String),
      type: 'dislike',
      userId: userId2,
      postId: postId2,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(reactions[2]).toMatchObject({
      id: expect.any(String),
      type: 'like',
      userId: userId3,
      postId: postId3,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get all posts reactions with type like', async () => {
    await repository.createPostReaction({
      type: 'like',
      userId,
      postId,
    })

    await repository.createPostReaction({
      type: 'dislike',
      userId: userId2,
      postId: postId2,
    })

    await repository.createPostReaction({
      type: 'like',
      userId: userId3,
      postId: postId3,
    })

    const reactions = await repository.getPostReactions('like')

    expect(reactions).toBeTruthy()
    expect(reactions.length).toBe(2)
    expect(reactions[0]).toMatchObject({
      id: expect.any(String),
      type: 'like',
      userId,
      postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(reactions[1]).toMatchObject({
      id: expect.any(String),
      type: 'like',
      userId: userId3,
      postId: postId3,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('shoul get two posts reactions when try to get all posts reactions with take 2', async () => {
    await repository.createPostReaction({
      type: 'like',
      userId,
      postId,
    })

    await repository.createPostReaction({
      type: 'dislike',
      userId: userId2,
      postId: postId2,
    })

    await repository.createPostReaction({
      type: 'like',
      userId: userId3,
      postId: postId3,
    })

    const reactions = await repository.getPostReactions(undefined, 2)

    expect(reactions).toBeTruthy()
    expect(reactions.length).toBe(2)
    expect(reactions[0]).toStrictEqual({
      id: expect.any(String),
      type: 'like',
      userId,
      postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(reactions[1]).toMatchObject({
      id: expect.any(String),
      type: 'dislike',
      userId: userId2,
      postId: postId2,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get two posts reactions when try to get all posts reactions with skip 1 and take 2', async () => {
    await repository.createPostReaction({
      type: 'like',
      userId,
      postId,
    })

    await repository.createPostReaction({
      type: 'dislike',
      userId: userId2,
      postId: postId2,
    })

    await repository.createPostReaction({
      type: 'like',
      userId: userId3,
      postId: postId3,
    })

    const reactions = await repository.getPostReactions(undefined, 2, 1)

    expect(reactions).toBeTruthy()
    expect(reactions.length).toBe(2)
    expect(reactions[0]).toMatchObject({
      id: expect.any(String),
      type: 'dislike',
      userId: userId2,
      postId: postId2,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(reactions[1]).toStrictEqual({
      id: expect.any(String),
      type: 'like',
      userId: userId3,
      postId: postId3,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get all posts reactions from a post', async () => {
    await repository.createPostReaction({
      type: 'like',
      userId,
      postId,
    })

    await repository.createPostReaction({
      type: 'dislike',
      userId: userId2,
      postId,
    })

    await repository.createPostReaction({
      type: 'like',
      userId: userId3,
      postId,
    })

    const reactions = await repository.getPostReactionsByPostId(postId)

    expect(reactions).toBeTruthy()
    expect(reactions.length).toBe(3)
    expect(reactions[0]).toMatchObject({
      id: expect.any(String),
      type: 'like',
      userId,
      postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(reactions[1]).toMatchObject({
      id: expect.any(String),
      type: 'dislike',
      userId: userId2,
      postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(reactions[2]).toMatchObject({
      id: expect.any(String),
      type: 'like',
      userId: userId3,
      postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get all posts reactions from a user', async () => {
    await repository.createPostReaction({
      type: 'like',
      userId,
      postId,
    })

    await repository.createPostReaction({
      type: 'dislike',
      userId,
      postId: postId2,
    })

    const reactions = await repository.getPostReactionsByUserId(userId)

    expect(reactions).toBeTruthy()
    expect(reactions.length).toBe(2)
    expect(reactions[0]).toMatchObject({
      id: expect.any(String),
      type: 'like',
      userId,
      postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(reactions[1]).toMatchObject({
      id: expect.any(String),
      type: 'dislike',
      userId,
      postId: postId2,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get an empty array when try to get all posts reactions from a post that does not exists', async () => {
    const reactions = await repository.getPostReactionsByPostId(
      'invalid-post-id',
    )

    expect(reactions).toBeTruthy()
    expect(reactions.length).toBe(0)
  })

  it('should get an empty array when try to get all posts reactions from a user that does not exists', async () => {
    const reactions = await repository.getPostReactionsByUserId(
      'invalid-user-id',
    )

    expect(reactions).toBeTruthy()
    expect(reactions.length).toBe(0)
  })

  it('should get a post reaction by id', async () => {
    const reaction = await repository.createPostReaction({
      type: 'like',
      userId,
      postId,
    })

    const foundReaction = await repository.getPostReactionById(reaction.id)

    expect(foundReaction).toBeTruthy()
    expect(foundReaction).toMatchObject({
      id: reaction.id,
      type: 'like',
      userId,
      postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return undefined when try to get a post reaction by id that does not exists', async () => {
    const foundReaction = await repository.getPostReactionById(
      'invalid-reaction-id',
    )

    expect(foundReaction).toBeUndefined()
  })

  it('should delete a post reaction by id', async () => {
    const reaction = await repository.createPostReaction({
      type: 'like',
      userId,
      postId,
    })

    const deleted = await repository.deletePostReaction(reaction.id)

    expect(deleted).toBeTruthy()
    expect(deleted).toMatchObject({
      id: reaction.id,
      type: 'like',
      userId,
      postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
})
