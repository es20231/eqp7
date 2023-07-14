import {
  MemoryImageRepository,
  clear,
} from '../../../../src/repositories/implementations/memory/image.repository'

describe('ImageRepository', () => {
  const repository = MemoryImageRepository
  it('should be defined', () => {
    expect(repository).toBeTruthy()
  })

  beforeEach(() => {
    clear()
  })

  it('should create an image', async () => {
    const image = {
      url: 'https://github.com/CassianoJunior.png',
      userId: 'test-user-id',
    }
    const { ok, message, payload } = await repository.createImage(image)
    expect(ok).toBe(true)
    expect(message).toBe('Image created successfully')
    expect(payload).toBeTruthy()
    expect(payload).toStrictEqual({
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
      userId: 'test-user-id',
    }
    const { payload } = await repository.createImage(image)
    const id = payload?.id
    if (!id) throw new Error('Image id not created')
    const {
      ok,
      message,
      payload: imageFound,
    } = await repository.getImage(payload.id)
    expect(ok).toBe(true)
    expect(message).toBe('Image found successfully')
    expect(imageFound).toBeTruthy()
    expect(imageFound).toStrictEqual({
      id,
      url: image.url,
      userId: image.userId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should not get an image by invalid id', async () => {
    const { ok, message, payload } = await repository.getImage('invalid-id')
    expect(ok).toBe(false)
    expect(message).toBe('Image #invalid-id not found')
    expect(payload).toBeUndefined()
  })

  it('should get all images', async () => {
    const image1 = {
      url: 'https://github.com/CassianoJunior.png',
      userId: 'test-user-id',
    }

    const image2 = {
      url: 'https://github.com/CassianoJunior.png',
      userId: 'test-user-id-2',
    }

    await repository.createImage(image1)
    await repository.createImage(image2)

    const { ok, message, payload } = await repository.getImages()
    expect(ok).toBe(true)
    expect(message).toBe('Images found successfully')
    expect(payload).toBeTruthy()
    expect(payload).toHaveLength(2)
    expect(payload).toStrictEqual(
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
      userId: 'test-user-id',
    }

    const { payload } = await repository.createImage(image)
    const id = payload?.id

    if (!id) throw new Error('Image id not created')

    const { ok, message } = await repository.deleteImage(id)

    expect(ok).toBe(true)
    expect(message).toBe('Image deleted successfully')

    const { ok: okAfterDelete, message: messageAfterDelete } =
      await repository.getImage(id)

    expect(okAfterDelete).toBe(false)
    expect(messageAfterDelete).toBe(`Image #${id} not found`)
  })

  it('should not delete an image by invalid id', async () => {
    const { ok, message } = await repository.deleteImage('invalid-id')
    expect(ok).toBe(false)
    expect(message).toBe('Image #invalid-id not found')
  })
})
