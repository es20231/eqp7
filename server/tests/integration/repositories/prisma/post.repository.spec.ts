import { clearPrismaDatabase, prisma } from '../../../../src/lib/prisma'
import {
  PrismaPostRepository,
  clearPostsPrisma,
} from '../../../../src/repositories/implementations/prisma/post.repository'

describe('PrismaPostRepository', () => {
  const repository = PrismaPostRepository
  let userId: string
  let imageId: string

  it('should be defined', () => {
    expect(repository).toBeTruthy()
  })

  beforeAll(async () => {
    await clearPrismaDatabase()
    const user = await prisma.user.create({
      data: {
        username: 'Jose',
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
  })

  afterAll(async () => {
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

  afterEach(async () => await clearPostsPrisma())

  it('should create a post', async () => {
    const post = {
      subtitle: 'Teste',
      userId,
      imageId,
    }
    const created = await repository.createPost(post)

    expect(created).toBeTruthy()
    expect(created).toStrictEqual({
      id: expect.any(String),
      subtitle: post.subtitle,
      userId: post.userId,
      imageId: post.imageId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should throw error when try to create a post with non existent user', async () => {
    const post = {
      subtitle: 'Teste',
      userId: 'non-existent-user',
      imageId,
    }
    await expect(repository.createPost(post)).rejects.toThrow()
  })

  it('should throw error when try to create a post with non existent image', async () => {
    const post = {
      subtitle: 'Teste',
      userId,
      imageId: 'non-existent-image',
    }
    await expect(repository.createPost(post)).rejects.toThrow()
  })

  it('should find a post by id', async () => {
    const post = {
      subtitle: 'Teste',
      userId,
      imageId,
    }
    const { id } = await repository.createPost(post)
    const found = await repository.getPostById(id)

    expect(found).toBeTruthy()
    expect(found).toStrictEqual({
      id,
      subtitle: post.subtitle,
      userId: post.userId,
      imageId: post.imageId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return undefined when try to find a post by non existent id', async () => {
    const found = await repository.getPostById('non-existent-id')
    expect(found).toBeUndefined()
  })

  it('should find all posts', async () => {
    const post = {
      subtitle: 'Teste',
      userId,
      imageId,
    }
    const { id } = await repository.createPost(post)
    const found = await repository.getPosts()

    expect(found).toBeTruthy()
    expect(found).toStrictEqual([
      {
        id,
        subtitle: post.subtitle,
        userId: post.userId,
        imageId: post.imageId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ])
  })

  it('should find all posts by user id', async () => {
    const post = {
      subtitle: 'Teste',
      userId,
      imageId,
    }
    const { id } = await repository.createPost(post)
    const found = await repository.getPostsByUserId(userId)

    expect(found).toBeTruthy()
    expect(found).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id,
          subtitle: post.subtitle,
          userId: post.userId,
          imageId: post.imageId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    )
  })

  it('should return empty array when try to find all posts by non existent user id', async () => {
    const found = await repository.getPostsByUserId('non-existent-user-id')
    expect(found).toStrictEqual([])
  })

  it('should update a post', async () => {
    const post = {
      subtitle: 'Teste',
      userId,
      imageId,
    }
    const { id } = await repository.createPost(post)
    const updated = await repository.updatePost(id, {
      subtitle: 'Teste 2',
    })

    expect(updated).toBeTruthy()
    expect(updated).toStrictEqual({
      id,
      subtitle: 'Teste 2',
      userId: post.userId,
      imageId: post.imageId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should throw error when try to update a post with non existent id', async () => {
    await expect(
      repository.updatePost('non-existent-id', {
        subtitle: 'Teste 2',
      }),
    ).rejects.toThrow()
  })

  it('should be able to update a post with the same subtitle', async () => {
    const post = {
      subtitle: 'Teste',
      userId,
      imageId,
    }
    const { id } = await repository.createPost(post)
    const updated = await repository.updatePost(id, {
      subtitle: 'Teste',
    })

    expect(updated).toBeTruthy()
    expect(updated).toStrictEqual({
      id,
      subtitle: 'Teste',
      userId: post.userId,
      imageId: post.imageId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should be able to update a post with the same image id', async () => {
    const post = {
      subtitle: 'Teste',
      userId,
      imageId,
    }
    const { id } = await repository.createPost(post)
    const updated = await repository.updatePost(id, {
      imageId,
    })

    expect(updated).toBeTruthy()
    expect(updated).toStrictEqual({
      id,
      subtitle: post.subtitle,
      userId: post.userId,
      imageId: post.imageId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should be able to update a post with the same user id', async () => {
    const post = {
      subtitle: 'Teste',
      userId,
      imageId,
    }
    const { id } = await repository.createPost(post)
    const updated = await repository.updatePost(id, {
      userId,
    })

    expect(updated).toBeTruthy()
    expect(updated).toStrictEqual({
      id,
      subtitle: post.subtitle,
      userId: post.userId,
      imageId: post.imageId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should delete a post', async () => {
    const post = {
      subtitle: 'Teste',
      userId,
      imageId,
    }
    const { id } = await repository.createPost(post)
    const deleted = await repository.deletePost(id)

    expect(deleted).toBeTruthy()
    expect(deleted).toStrictEqual({
      id,
      subtitle: post.subtitle,
      userId: post.userId,
      imageId: post.imageId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should throw error when try to delete a post with non existent id', async () => {
    await expect(repository.deletePost('non-existent-id')).rejects.toThrow()
  })
})
