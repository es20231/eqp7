import { clearPrismaDatabase, prisma } from '../../../../src/lib/prisma'
import {
  PrismaCommentRepository,
  clearCommentsPrisma,
} from '../../../../src/repositories/implementations/prisma/comment.repository'

describe('PrismaCommentRepository', () => {
  const repository = PrismaCommentRepository
  let userId: string
  let postId: string
  let imageId: string
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
        subtitle: 'Teste',
        userId,
        imageId,
      },
    })
    postId = post.id
  })

  afterAll(async () => {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    })

    await prisma.image.delete({
      where: {
        id: imageId,
      },
    })

    await prisma.user.delete({
      where: {
        id: userId,
      },
    })
  })

  afterEach(async () => await clearCommentsPrisma())

  it('should create a comment', async () => {
    const comment = {
      content: 'Teste',
      userId,
      postId,
    }

    const created = await repository.createComment(comment)

    expect(created).toBeTruthy()
    expect(created).toMatchObject({
      id: expect.any(String),
      content: comment.content,
      userId: comment.userId,
      postId: comment.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should throw error when try to create a comment with non existent user', async () => {
    const comment = {
      content: 'Teste',
      userId: 'non-existent-user-id',
      postId,
    }

    await expect(repository.createComment(comment)).rejects.toThrow()
  })

  it('should throw error when try to create a comment with non existent post', async () => {
    const comment = {
      content: 'Teste',
      userId,
      postId: 'non-existent-post-id',
    }

    await expect(repository.createComment(comment)).rejects.toThrow()
  })

  it('should return all comments', async () => {
    const comment1 = {
      content: 'Teste',
      userId,
      postId,
    }

    await repository.createComment(comment1)

    const comment2 = {
      content: 'Test2',
      userId,
      postId,
    }

    await repository.createComment(comment2)

    const comments = await repository.getComments()

    expect(comments).toBeTruthy()
    expect(comments.length).toBe(2)
    expect(comments[0]).toMatchObject({
      id: expect.any(String),
      content: comment1.content,
      userId: comment1.userId,
      postId: comment1.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(comments[1]).toMatchObject({
      id: expect.any(String),
      content: comment2.content,
      userId: comment2.userId,
      postId: comment2.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return two comments when try to get all comments with take 2', async () => {
    const comment1 = {
      content: 'Teste 1',
      userId,
      postId,
    }

    await repository.createComment(comment1)

    const comment2 = {
      content: 'Teste 2',
      userId,
      postId,
    }

    await repository.createComment(comment2)

    const comment3 = {
      content: 'Teste 3',
      userId,
      postId,
    }

    await repository.createComment(comment3)

    const comments = await repository.getComments(2)

    expect(comments).toBeTruthy()
    expect(comments.length).toBe(2)
    expect(comments[0]).toMatchObject({
      id: expect.any(String),
      content: comment1.content,
      userId: comment1.userId,
      postId: comment1.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(comments[1]).toMatchObject({
      id: expect.any(String),
      content: comment2.content,
      userId: comment2.userId,
      postId: comment2.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return two comments when try to get all comments with take 2 and skip 2', async () => {
    const comment1 = {
      content: 'Teste 1',
      userId,
      postId,
    }

    await repository.createComment(comment1)

    const comment2 = {
      content: 'Teste 2',
      userId,
      postId,
    }

    await repository.createComment(comment2)

    const comment3 = {
      content: 'Teste 3',
      userId,
      postId,
    }

    await repository.createComment(comment3)

    const comment4 = {
      content: 'Teste 4',
      userId,
      postId,
    }

    await repository.createComment(comment4)

    const comments = await repository.getComments(2, 2)

    expect(comments).toBeTruthy()
    expect(comments.length).toBe(2)
    expect(comments[0]).toMatchObject({
      id: expect.any(String),
      content: comment3.content,
      userId: comment3.userId,
      postId: comment3.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(comments[1]).toMatchObject({
      id: expect.any(String),
      content: comment4.content,
      userId: comment4.userId,
      postId: comment4.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return all comments from a post', async () => {
    const comment1 = {
      content: 'Teste',
      userId,
      postId,
    }

    await repository.createComment(comment1)

    const comment2 = {
      content: 'Test2',
      userId,
      postId,
    }

    await repository.createComment(comment2)

    const comments = await repository.getCommentsByPostId(postId)

    expect(comments).toBeTruthy()
    expect(comments.length).toBe(2)
    expect(comments[0]).toMatchObject({
      id: expect.any(String),
      content: comment1.content,
      userId: comment1.userId,
      postId: comment1.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(comments[1]).toMatchObject({
      id: expect.any(String),
      content: comment2.content,
      userId: comment2.userId,
      postId: comment2.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return two comments from a post when try to get all comments with take 2', async () => {
    const comment1 = {
      content: 'Teste 1',
      userId,
      postId,
    }

    await repository.createComment(comment1)

    const comment2 = {
      content: 'Teste 2',
      userId,
      postId,
    }

    await repository.createComment(comment2)

    const comment3 = {
      content: 'Teste 3',
      userId,
      postId,
    }

    await repository.createComment(comment3)

    const comments = await repository.getCommentsByPostId(postId, 2)

    expect(comments).toBeTruthy()
    expect(comments.length).toBe(2)
    expect(comments[0]).toMatchObject({
      id: expect.any(String),
      content: comment1.content,
      userId: comment1.userId,
      postId: comment1.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(comments[1]).toMatchObject({
      id: expect.any(String),
      content: comment2.content,
      userId: comment2.userId,
      postId: comment2.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return two comments from a post when try to get all comments with take 2 and skip 2', async () => {
    const comment1 = {
      content: 'Teste 1',
      userId,
      postId,
    }

    await repository.createComment(comment1)

    const comment2 = {
      content: 'Teste 2',
      userId,
      postId,
    }

    await repository.createComment(comment2)

    const comment3 = {
      content: 'Teste 3',
      userId,
      postId,
    }

    await repository.createComment(comment3)

    const comment4 = {
      content: 'Teste 4',
      userId,
      postId,
    }

    await repository.createComment(comment4)

    const comments = await repository.getCommentsByPostId(postId, 2, 2)

    expect(comments).toBeTruthy()
    expect(comments.length).toBe(2)
    expect(comments[0]).toMatchObject({
      id: expect.any(String),
      content: comment3.content,
      userId: comment3.userId,
      postId: comment3.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(comments[1]).toMatchObject({
      id: expect.any(String),
      content: comment4.content,
      userId: comment4.userId,
      postId: comment4.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return an empty array when try to get comments from a non existent post', async () => {
    const comments = await repository.getCommentsByPostId(
      'non-existent-post-id',
    )

    expect(comments).toBeTruthy()
    expect(comments.length).toBe(0)
  })

  it('should return an empty array when try to get comments from a non existent user', async () => {
    const comments = await repository.getCommentsByUserId(
      'non-existent-user-id',
    )

    expect(comments).toBeTruthy()
    expect(comments.length).toBe(0)
  })

  it('should return all comments from a user', async () => {
    const comment1 = {
      content: 'Teste',
      userId,
      postId,
    }

    await repository.createComment(comment1)

    const comment2 = {
      content: 'Test2',
      userId,
      postId,
    }

    await repository.createComment(comment2)

    const comments = await repository.getCommentsByUserId(userId)

    expect(comments).toBeTruthy()
    expect(comments.length).toBe(2)
    expect(comments[0]).toMatchObject({
      id: expect.any(String),
      content: comment1.content,
      userId: comment1.userId,
      postId: comment1.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(comments[1]).toMatchObject({
      id: expect.any(String),
      content: comment2.content,
      userId: comment2.userId,
      postId: comment2.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return two comments from a user when try to get all comments with take 2', async () => {
    const comment1 = {
      content: 'Teste 1',
      userId,
      postId,
    }

    await repository.createComment(comment1)

    const comment2 = {
      content: 'Teste 2',
      userId,
      postId,
    }

    await repository.createComment(comment2)

    const comment3 = {
      content: 'Teste 3',
      userId,
      postId,
    }

    await repository.createComment(comment3)

    const comments = await repository.getCommentsByUserId(userId, 2)

    expect(comments).toBeTruthy()
    expect(comments.length).toBe(2)
    expect(comments[0]).toMatchObject({
      id: expect.any(String),
      content: comment1.content,
      userId: comment1.userId,
      postId: comment1.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(comments[1]).toMatchObject({
      id: expect.any(String),
      content: comment2.content,
      userId: comment2.userId,
      postId: comment2.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return two comments from a user when try to get all comments with take 2 and skip 2', async () => {
    const comment1 = {
      content: 'Teste 1',
      userId,
      postId,
    }

    await repository.createComment(comment1)

    const comment2 = {
      content: 'Teste 2',
      userId,
      postId,
    }

    await repository.createComment(comment2)

    const comment3 = {
      content: 'Teste 3',
      userId,
      postId,
    }

    await repository.createComment(comment3)

    const comment4 = {
      content: 'Teste 4',
      userId,
      postId,
    }

    await repository.createComment(comment4)

    const comments = await repository.getCommentsByUserId(userId, 2, 2)

    expect(comments).toBeTruthy()
    expect(comments.length).toBe(2)
    expect(comments[0]).toMatchObject({
      id: expect.any(String),
      content: comment3.content,
      userId: comment3.userId,
      postId: comment3.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
    expect(comments[1]).toMatchObject({
      id: expect.any(String),
      content: comment4.content,
      userId: comment4.userId,
      postId: comment4.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return a comment by id', async () => {
    const comment1 = {
      content: 'Teste',
      userId,
      postId,
    }

    const created = await repository.createComment(comment1)

    const comment = await repository.getCommentById(created.id)

    expect(comment).toBeTruthy()
    expect(comment).toMatchObject({
      id: expect.any(String),
      content: comment1.content,
      userId: comment1.userId,
      postId: comment1.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return undefined when try to get a comment by non existent id', async () => {
    const comment = await repository.getCommentById('non-existent-id')

    expect(comment).toBeUndefined()
  })

  it('should delete a comment by id', async () => {
    const comment1 = {
      content: 'Teste',
      userId,
      postId,
    }

    const created = await repository.createComment(comment1)

    const deleted = await repository.deleteComment(created.id)

    expect(deleted).toBeTruthy()
    expect(deleted).toMatchObject({
      id: expect.any(String),
      content: comment1.content,
      userId: comment1.userId,
      postId: comment1.postId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should throw error when try to delete a comment by non existent id', async () => {
    await expect(repository.deleteComment('non-existent-id')).rejects.toThrow()
  })
})
