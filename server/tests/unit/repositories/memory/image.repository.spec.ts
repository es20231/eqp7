import {
  MemoryImageRepository,
  clearImageMemory,
} from '../../../../src/repositories/implementations/memory/image.repository'

describe('ImageRepository', () => {
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
    const id = created?.id
    if (!id) throw new Error('Image id not created')
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

  it('should return undefined when try to get an image by invalid id', async () => {
    const image = await repository.getImage('invalid-id')
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

  it('should return undefined when try to delete an image by invalid id', async () => {
    const image = await repository.deleteImage('invalid-id')
    expect(image).toBeUndefined()
  })
})
