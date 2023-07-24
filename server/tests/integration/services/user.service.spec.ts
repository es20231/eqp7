import { instantiatedImageService } from '../../../src/factories/image.factory'
import { instantiatedUserService } from '../../../src/factories/user.factory'
import {
  MemoryImageRepository,
  clearImageMemory,
} from '../../../src/repositories/implementations/memory/image.repository'
import {
  MemoryUserRepository,
  clearUserMemory,
} from '../../../src/repositories/implementations/memory/user.repository'
import {
  PrismaImageRepository,
  clearImagesPrisma,
} from '../../../src/repositories/implementations/prisma/image.repository'
import {
  PrismaUserRepository,
  clearUsersPrisma,
} from '../../../src/repositories/implementations/prisma/user.repository'

describe('Memory User Service', () => {
  const service = instantiatedUserService(
    MemoryUserRepository,
    MemoryImageRepository,
  )

  const imageService = instantiatedImageService(
    MemoryImageRepository,
    MemoryUserRepository,
  )

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  const defaultUser = {
    username: 'test',
    email: 'test@test.com',
    password: 'test',
    fullName: 'Test tested',
  }

  afterEach(async () => {
    await clearImageMemory()
    await clearUserMemory()
  })

  describe('create', () => {
    it('should create a user', async () => {
      const { ok, message, payload } = await service.createUser(defaultUser)

      expect(ok).toBe(true)
      expect(message).toBe('User created successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual({
        id: expect.any(String),
        ...defaultUser,
        password: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not create a user with an existing username', async () => {
      await service.createUser(defaultUser)
      const { ok, message, payload } = await service.createUser({
        ...defaultUser,
        email: 'diferent@email.com',
      })

      expect(ok).toBe(false)
      expect(message).toContain('Username')
      expect(message).toContain('already exists')
      expect(payload).toBeUndefined()
    })

    it('should not create a user with an existing email', async () => {
      await service.createUser(defaultUser)

      const { ok, message, payload } = await service.createUser({
        ...defaultUser,
        username: 'diferent',
      })

      expect(ok).toBe(false)
      expect(message).toContain('Email')
      expect(message).toContain('already exists')
      expect(payload).toBeUndefined()
    })
  })

  describe('find', () => {
    it('should find all users', async () => {
      await service.createUser(defaultUser)
      await service.createUser({
        ...defaultUser,
        username: 'diferent',
        email: 'diferent@mail.com',
      })

      const { ok, message, payload } = await service.getUsers()

      expect(ok).toBe(true)
      expect(message).toBe('Users found successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            ...defaultUser,
            password: expect.any(String),
            profilePicture: undefined,
            biography: undefined,
            emailVerified: false,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            ...defaultUser,
            username: 'diferent',
            email: 'diferent@mail.com',
            password: expect.any(String),
            profilePicture: undefined,
            biography: undefined,
            emailVerified: false,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })

    it('should find a user by id', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { id } = created

      const { ok, message, payload } = await service.getUserById(id)

      expect(ok).toBe(true)
      expect(message).toBe('User found successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual({
        id: expect.any(String),
        ...defaultUser,
        password: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not find a user by non existent id', async () => {
      const { ok, message, payload } = await service.getUserById('non-existent')

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBeUndefined()
    })

    it('should find a user by username', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { username } = created

      const { ok, message, payload } = await service.getUserByUsername(username)

      expect(ok).toBe(true)
      expect(message).toBe('User found successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual({
        id: expect.any(String),
        ...defaultUser,
        password: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not find a user by non existent username', async () => {
      const { ok, message, payload } = await service.getUserByUsername(
        'non-existent',
      )

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBeUndefined()
    })

    it('should find a user by email', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { email } = created

      const { ok, message, payload } = await service.getUserByEmail(email)

      expect(ok).toBe(true)
      expect(message).toBe('User found successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual({
        id: expect.any(String),
        ...defaultUser,
        password: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not find a user by non existent email', async () => {
      const { ok, message, payload } = await service.getUserByEmail(
        'non-existent@mail.com',
      )

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBeUndefined()
    })
  })

  describe('update', () => {
    it('should update a user', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { id } = created

      const { ok, message, payload } = await service.updateUser(id, {
        username: 'updated',
        email: 'updated@mail.com',
        fullName: 'Updated',
      })

      expect(ok).toBe(true)
      expect(message).toBe('User updated successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual({
        id,
        username: 'updated',
        email: 'updated@mail.com',
        fullName: 'Updated',
        password: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })

      const { ok: okFind, payload: found } = await service.getUserById(id)

      expect(okFind).toBe(true)
      expect(found).toBeDefined()
      expect(found).toStrictEqual({
        id,
        username: 'updated',
        email: 'updated@mail.com',
        fullName: 'Updated',
        password: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not update a user with an existing username', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { id } = created

      await service.createUser({
        ...defaultUser,
        username: 'diferent',
        email: 'diferent@mail.com',
      })

      const { ok, message, payload } = await service.updateUser(id, {
        username: 'diferent',
      })

      expect(ok).toBe(false)
      expect(message).toContain('Username')
      expect(message).toContain('already exists')
      expect(payload).toBeUndefined()
    })

    it('should not update a user with an existing email', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { id } = created

      await service.createUser({
        ...defaultUser,
        username: 'diferent',
        email: 'diferent@mail.com',
      })

      const { ok, message, payload } = await service.updateUser(id, {
        email: 'diferent@mail.com',
      })

      expect(ok).toBe(false)
      expect(message).toContain('Email')
      expect(message).toContain('already exists')
      expect(payload).toBeUndefined()
    })

    it('should not update a non existent user', async () => {
      const { ok, message, payload } = await service.updateUser(
        'non-existent',
        {
          username: 'updated',
        },
      )

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBeUndefined()
    })

    it('should update a user with same username when is same id', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { id } = created

      const { ok, message, payload } = await service.updateUser(id, {
        username: defaultUser.username,
        password: 'updated',
      })

      expect(ok).toBe(true)
      expect(message).toBe('User updated successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual({
        id,
        ...defaultUser,
        password: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })
  })

  describe('delete', () => {
    it('should delete a user', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { id } = created

      const { ok, message, payload } = await service.deleteUser(id)

      expect(ok).toBe(true)
      expect(message).toBe('User deleted successfully')
      expect(payload).toBeUndefined()

      const {
        ok: okFind,
        message: msgFind,
        payload: found,
      } = await service.getUserById(id)

      expect(okFind).toBe(false)
      expect(msgFind).toContain('User')
      expect(msgFind).toContain('not found')
      expect(found).toBeUndefined()
    })

    it('should not delete a non existent user', async () => {
      const { ok, message, payload } = await service.deleteUser('non-existent')

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBeUndefined()
    })
  })

  describe('getUserImages', () => {
    it('should get user images', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { id } = created

      await imageService.createImage({
        userId: id,
        url: 'https://github.com/CassianoJunior.png',
      })

      const { ok, message, payload } = await service.getUserImages(id)

      expect(ok).toBe(true)
      expect(message).toBe('Images found successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            userId: id,
            url: 'https://github.com/CassianoJunior.png',
          }),
        ]),
      )
    })

    it('should not get user images from non existent user', async () => {
      const { ok, message, payload } = await service.getUserImages(
        'non-existent',
      )

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBeUndefined()
    })
  })

  // describe('getUserPosts', () => {
  //   it('should get user posts', async () => {})
  //   it('should not get user posts from non existent user', async () => {})
  // })
})

describe('Prisma User Service', () => {
  const service = instantiatedUserService(
    PrismaUserRepository,
    PrismaImageRepository,
  )

  const imageService = instantiatedImageService(
    PrismaImageRepository,
    PrismaUserRepository,
  )

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  const defaultUser = {
    username: 'test',
    email: 'test@test.com',
    password: 'test',
    fullName: 'Test tested',
  }

  afterEach(async () => {
    await clearImagesPrisma()
    await clearUsersPrisma()
  })

  describe('create', () => {
    it('should create a user', async () => {
      const { ok, message, payload } = await service.createUser(defaultUser)

      expect(ok).toBe(true)
      expect(message).toBe('User created successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual({
        id: expect.any(String),
        ...defaultUser,
        password: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not create a user with an existing username', async () => {
      await service.createUser(defaultUser)
      const { ok, message, payload } = await service.createUser({
        ...defaultUser,
        email: 'diferent@email.com',
      })

      expect(ok).toBe(false)
      expect(message).toContain('Username')
      expect(message).toContain('already exists')
      expect(payload).toBeUndefined()
    })

    it('should not create a user with an existing email', async () => {
      await service.createUser(defaultUser)

      const { ok, message, payload } = await service.createUser({
        ...defaultUser,
        username: 'diferent',
      })

      expect(ok).toBe(false)
      expect(message).toContain('Email')
      expect(message).toContain('already exists')
      expect(payload).toBeUndefined()
    })
  })

  describe('find', () => {
    it('should find all users', async () => {
      await service.createUser(defaultUser)
      await service.createUser({
        ...defaultUser,
        username: 'diferent',
        email: 'diferent@mail.com',
      })

      const { ok, message, payload } = await service.getUsers()

      expect(ok).toBe(true)
      expect(message).toBe('Users found successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            ...defaultUser,
            password: expect.any(String),
            profilePicture: undefined,
            biography: undefined,
            emailVerified: false,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            id: expect.any(String),
            ...defaultUser,
            username: 'diferent',
            email: 'diferent@mail.com',
            password: expect.any(String),
            profilePicture: undefined,
            biography: undefined,
            emailVerified: false,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })

    it('should find a user by id', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { id } = created

      const { ok, message, payload } = await service.getUserById(id)

      expect(ok).toBe(true)
      expect(message).toBe('User found successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual({
        id: expect.any(String),
        ...defaultUser,
        password: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not find a user by non existent id', async () => {
      const { ok, message, payload } = await service.getUserById('non-existent')

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBeUndefined()
    })

    it('should find a user by username', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { username } = created

      const { ok, message, payload } = await service.getUserByUsername(username)

      expect(ok).toBe(true)
      expect(message).toBe('User found successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual({
        id: expect.any(String),
        ...defaultUser,
        password: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not find a user by non existent username', async () => {
      const { ok, message, payload } = await service.getUserByUsername(
        'non-existent',
      )

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBeUndefined()
    })

    it('should find a user by email', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { email } = created

      const { ok, message, payload } = await service.getUserByEmail(email)

      expect(ok).toBe(true)
      expect(message).toBe('User found successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual({
        id: expect.any(String),
        ...defaultUser,
        password: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not find a user by non existent email', async () => {
      const { ok, message, payload } = await service.getUserByEmail(
        'non-existent@mail.com',
      )

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBeUndefined()
    })
  })

  describe('update', () => {
    it('should update a user', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { id } = created

      const { ok, message, payload } = await service.updateUser(id, {
        username: 'updated',
        email: 'updated@mail.com',
        fullName: 'Updated',
      })

      expect(ok).toBe(true)
      expect(message).toBe('User updated successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual({
        id,
        username: 'updated',
        email: 'updated@mail.com',
        fullName: 'Updated',
        password: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })

      const { ok: okFind, payload: found } = await service.getUserById(id)

      expect(okFind).toBe(true)
      expect(found).toBeDefined()
      expect(found).toStrictEqual({
        id,
        username: 'updated',
        email: 'updated@mail.com',
        fullName: 'Updated',
        password: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not update a user with an existing username', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { id } = created

      await service.createUser({
        ...defaultUser,
        username: 'diferent',
        email: 'diferent@mail.com',
      })

      const { ok, message, payload } = await service.updateUser(id, {
        username: 'diferent',
      })

      expect(ok).toBe(false)
      expect(message).toContain('Username')
      expect(message).toContain('already exists')
      expect(payload).toBeUndefined()
    })

    it('should not update a user with an existing email', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { id } = created

      await service.createUser({
        ...defaultUser,
        username: 'diferent',
        email: 'diferent@mail.com',
      })

      const { ok, message, payload } = await service.updateUser(id, {
        email: 'diferent@mail.com',
      })

      expect(ok).toBe(false)
      expect(message).toContain('Email')
      expect(message).toContain('already exists')
      expect(payload).toBeUndefined()
    })

    it('should not update a non existent user', async () => {
      const { ok, message, payload } = await service.updateUser(
        'non-existent',
        {
          username: 'updated',
        },
      )

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBeUndefined()
    })

    it('should update a user with same username when is same id', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { id } = created

      const { ok, message, payload } = await service.updateUser(id, {
        username: defaultUser.username,
        password: 'updated',
      })

      expect(ok).toBe(true)
      expect(message).toBe('User updated successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual({
        id,
        ...defaultUser,
        password: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })
  })

  describe('delete', () => {
    it('should delete a user', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { id } = created

      const { ok, message, payload } = await service.deleteUser(id)

      expect(ok).toBe(true)
      expect(message).toBe('User deleted successfully')
      expect(payload).toBeUndefined()

      const {
        ok: okFind,
        message: msgFind,
        payload: found,
      } = await service.getUserById(id)

      expect(okFind).toBe(false)
      expect(msgFind).toContain('User')
      expect(msgFind).toContain('not found')
      expect(found).toBeUndefined()
    })

    it('should not delete a non existent user', async () => {
      const { ok, message, payload } = await service.deleteUser('non-existent')

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBeUndefined()
    })
  })

  describe('getUserImages', () => {
    it('should get user images', async () => {
      const { payload: created } = await service.createUser(defaultUser)

      if (!created) throw new Error('User not created')

      const { id } = created

      await imageService.createImage({
        userId: id,
        url: 'https://github.com/CassianoJunior.png',
      })

      const { ok, message, payload } = await service.getUserImages(id)

      expect(ok).toBe(true)
      expect(message).toBe('Images found successfully')
      expect(payload).toBeDefined()
      expect(payload).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            userId: id,
            url: 'https://github.com/CassianoJunior.png',
          }),
        ]),
      )
    })

    it('should not get user images from non existent user', async () => {
      const { ok, message, payload } = await service.getUserImages(
        'non-existent',
      )

      expect(ok).toBe(false)
      expect(message).toContain('User')
      expect(message).toContain('not found')
      expect(payload).toBeUndefined()
    })
  })

  // describe('getUserPosts', () => {
  //   it('should get user posts', async () => {})
  //   it('should not get user posts from non existent user', async () => {})
  // })
})
