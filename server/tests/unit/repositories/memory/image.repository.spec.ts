import {
  MemoryImageRepository,
  clearImageMemory,
} from '../../../../src/repositories/implementations/memory/image.repository'

describe('MemoryImageRepository', () => {
  const repository = MemoryImageRepository
  const userId = 'user-test-id'
  it('should be defined', () => {
    expect(repository).toBeTruthy()
  })

  afterEach(() => {
    clearImageMemory()
  })

  it('should create an image', async () => {
    const image = {
      url: 'https://github.com/CassianoJunior.png',
      userId,
    }
    const created = await repository.createImage(image)

    expect(created).toBeTruthy()
    expect(created).toStrictEqual({
      id: expect.any(String),
      url: image.url,
      userId: image.userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get an image by id', async () => {
    const image = {
      url: 'https://github.com/CassianoJunior.png',
      userId,
    }
    const created = await repository.createImage(image)
    const { id } = created
    const finded = await repository.getImage(id)
    expect(finded).toBeTruthy()
    expect(finded).toStrictEqual({
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
    expect(images).toStrictEqual(
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

  it('should get two images when try to get all images with take 2', async () => {
    const image1 = {
      url: 'https://github.com/CassianoJunior.png',
      userId,
    }

    const image2 = {
      url: 'https://github.com/CassianoJunior.png',
      userId,
    }

    const image3 = {
      url: 'https://github.com/CassianoJunior.png',
      userId,
    }

    await repository.createImage(image1)
    await repository.createImage(image2)
    await repository.createImage(image3)

    const images = await repository.getImages(2)

    expect(images).toBeTruthy()
    expect(images).toHaveLength(2)
    expect(images).toStrictEqual(
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

  it('should get one image when try to get all images with take 1 and skip 1', async () => {
    const image1 = {
      url: 'https://github.com/CassianoJunior.png',
      userId,
    }

    const image2 = {
      url: 'https://github.com/CassianoJunior.png',
      userId,
    }

    const image3 = {
      url: 'https://github.com/CassianoJunior.png',
      userId,
    }

    await repository.createImage(image1)
    await repository.createImage(image2)
    await repository.createImage(image3)

    const images = await repository.getImages(1, 1)

    expect(images).toBeTruthy()
    expect(images).toHaveLength(1)
    expect(images).toStrictEqual(
      expect.arrayContaining([
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

    const { id } = await repository.createImage(image)

    const deleted = await repository.deleteImage(id)

    expect(deleted).toBeTruthy()
    expect(deleted).toStrictEqual({
      id,
      url: image.url,
      userId: image.userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    const finded = await repository.getImage(id)

    expect(finded).toBeUndefined()
  })

  it('should throw error when try to delete an image by non existent id', async () => {
    await expect(repository.deleteImage('non-existent-id')).rejects.toThrow()
  })
})
