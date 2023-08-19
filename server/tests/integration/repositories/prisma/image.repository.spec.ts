import { clearPrismaDatabase, prisma } from '../../../../src/lib/prisma'
import {
  PrismaImageRepository,
  clearImagesPrisma,
} from '../../../../src/repositories/implementations/prisma/image.repository'
import {
  PrismaPostRepository,
  clearPostsPrisma,
} from '../../../../src/repositories/implementations/prisma/post.repository'

describe('PrismaImageRepository', () => {
  const repository = PrismaImageRepository
  let userId: string
  it('should be defined', () => {
    expect(repository).toBeTruthy()
  })

  beforeAll(async () => {
    await clearPrismaDatabase()
    const user = await prisma.user.create({
      data: {
        username: 'Cassiano',
        email: 'cassiano@mail.com',
        fullName: 'Cassiano Junior',
        password: 'test',
      },
    })

    userId = user.id
  })

  afterAll(async () => {
    await clearPrismaDatabase()
  })

  afterEach(async () => {
    await clearPostsPrisma()
    await clearImagesPrisma()
  })

  it('should create an image', async () => {
    const image = {
      url: 'https://github.com/CassianoJunior.png',
      userId,
    }
    const created = await repository.createImage(image)

    expect(created).toBeTruthy()
    expect(created).toMatchObject({
      id: expect.any(String),
      url: image.url,
      userId: image.userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should throw error when try to create an image with non existent user', async () => {
    const image = {
      url: 'https://github.com/CassianoJunior.png',
      userId: 'non-existent-user',
    }

    await expect(repository.createImage(image)).rejects.toThrowError()
  })

  it('should get an image by id', async () => {
    const image = {
      url: 'https://github.com/CassianoJunior.png',
      userId,
    }
    const { id } = await repository.createImage(image)

    const finded = await repository.getImage(id)
    expect(finded).toBeTruthy()
    expect(finded).toMatchObject({
      id,
      url: image.url,
      userId: image.userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should return undefined when try to get an image by non existent id', async () => {
    const image = await repository.getImage('non-existent-id')
    expect(image).toBeUndefined()
  })

  it('should get all images', async () => {
    const image1 = {
      url: 'https://github.com/CassianoJunior.png',
      userId,
    }

    const image2 = {
      url: 'https://github.com/CassianoJunior.png',
      userId,
    }

    await repository.createImage(image1)
    await repository.createImage(image2)

    const images = await repository.getImages()

    expect(images).toBeTruthy()
    expect(images).toHaveLength(2)
    expect(images).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          url: image1.url,
          userId: image1.userId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: expect.any(String),
          url: image2.url,
          userId: image2.userId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]),
    )
  })

  it('should delete an image by id', async () => {
    const image = {
      url: 'https://github.com/CassianoJunior.png',
      userId,
    }

    const created = await repository.createImage(image)
    const id = created?.id

    if (!id) throw new Error('Image id not created')

    const deleted = await repository.deleteImage(id)

    expect(deleted).toBeTruthy()
    expect(deleted).toMatchObject({
      id,
      url: image.url,
      userId: image.userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    const finded = await repository.getImage(id)

    expect(finded).toBeUndefined()
  })

  it('should do soft delete an image by id when image have post relationship', async () => {
    const image = {
      url: 'https://github.com/CassianoJunior.png',
      userId,
    }

    const created = await repository.createImage(image)

    const { id: postId } = await prisma.post.create({
      data: {
        subtitle: 'Post title',
        imageId: created.id,
        userId,
      },
    })

    const deleted = await repository.deleteImage(created.id)

    expect(deleted).toMatchObject({
      id: created.id,
      url: image.url,
      userId: image.userId,
      filter: undefined,
      deleted: true,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    const finded = await repository.getImage(created.id)

    expect(finded).toBeUndefined()

    expect(
      await prisma.image.findUnique({ where: { id: created.id } }),
    ).toMatchObject({
      id: created.id,
      url: image.url,
      userId: image.userId,
      filter: null,
      deleted: true,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    await PrismaPostRepository.deletePost(postId)

    expect(
      await prisma.image.findUnique({ where: { id: created.id } }),
    ).toBeNull()
  })

  it('should throw error when try to delete an image by non existent id', async () => {
    await expect(repository.deleteImage('non-existent-id')).rejects.toThrow()
  })
})
