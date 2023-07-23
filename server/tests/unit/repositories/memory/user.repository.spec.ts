import { CreateUserDTO } from '../../../../src/dtos/user/create-user.dto'
import {
  MemoryUserRepository,
  clearUserMemory,
} from '../../../../src/repositories/implementations/memory/user.repository'

describe('UserMemoryRepository', () => {
  const repository = MemoryUserRepository

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  afterEach(async () => {
    await clearUserMemory()
  })

  const defaultUser = {
    username: 'test',
    email: 'test@test.com',
    fullName: 'Test tested',
    password: 'test',
  } as CreateUserDTO

  describe('create', () => {
    it('should create a user', async () => {
      const created = await repository.createUser(defaultUser)

      expect(created).toBeDefined()
      expect(created).toStrictEqual({
        ...defaultUser,
        password: undefined,
        id: expect.any(String),
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not create a user with the same username', async () => {
      await repository.createUser({
        ...defaultUser,
        username: 'test2',
      })
      await expect(
        repository.createUser({
          ...defaultUser,
          username: 'test2',
          email: 'test@mail.com',
        }),
      ).rejects.toThrow()
    })

    it('should not create a user with the same email', async () => {
      await repository.createUser({
        ...defaultUser,
        email: 'test@mail.com',
      })

      await expect(
        repository.createUser({
          ...defaultUser,
          username: 'test2',
          email: 'test@mail.com',
        }),
      ).rejects.toThrow()
    })
  })

  describe('get', () => {
    it('should get all users', async () => {
      await repository.createUser(defaultUser)
      await repository.createUser({
        username: 'test2',
        email: 'test2@test.com',
        fullName: 'Test2 tested',
        password: 'test2',
      })

      const users = await repository.getUsers()

      expect(users).toBeDefined()
      expect(users).toHaveLength(2)
      expect(users).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...defaultUser,
            password: undefined,
            id: expect.any(String),
            profilePicture: undefined,
            biography: undefined,
            emailVerified: false,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
          expect.objectContaining({
            username: 'test2',
            email: 'test2@test.com',
            fullName: 'Test2 tested',
            id: expect.any(String),
            password: undefined,
            profilePicture: undefined,
            biography: undefined,
            emailVerified: false,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      )
    })

    it('should get a user by id', async () => {
      const created = await repository.createUser(defaultUser)
      const user = await repository.getUserById(created.id)

      expect(user).toBeDefined()
      expect(user).toStrictEqual({
        ...defaultUser,
        password: undefined,
        id: created.id,
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not get a user by non existent id', async () => {
      const user = await repository.getUserById('non-existent')

      expect(user).toBeUndefined()
    })

    it('should get a user by username', async () => {
      const created = await repository.createUser(defaultUser)
      const user = await repository.getUserByUsername(created.username)

      expect(user).toBeDefined()
      expect(user).toStrictEqual({
        ...defaultUser,
        password: undefined,
        id: created.id,
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not get a user by non existent username', async () => {
      const user = await repository.getUserByUsername('non-existent')

      expect(user).toBeUndefined()
    })

    it('should get a user by email', async () => {
      const created = await repository.createUser(defaultUser)
      const user = await repository.getUserByEmail(created.email)

      expect(user).toBeDefined()
      expect(user).toStrictEqual({
        ...defaultUser,
        password: undefined,
        id: created.id,
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not get a user by non existent email', async () => {
      const user = await repository.getUserByEmail('non-existent')

      expect(user).toBeUndefined()
    })
  })

  describe('update', () => {
    it('should update a user', async () => {
      const created = await repository.createUser(defaultUser)
      const updated = await repository.updateUser(created.id, {
        ...defaultUser,
        username: 'test2',
      })

      expect(updated).toBeDefined()
      expect(updated).toStrictEqual({
        ...defaultUser,
        username: 'test2',
        password: undefined,
        id: created.id,
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not update a user with the same username', async () => {
      const created = await repository.createUser(defaultUser)
      await repository.createUser({
        username: 'test2',
        email: 'test2@mail.com',
        fullName: 'Test2 tested',
        password: 'test2',
      })

      await expect(
        repository.updateUser(created.id, {
          username: 'test2',
        }),
      ).rejects.toThrow()
    })

    it('should not update a user with the same email', async () => {
      const created = await repository.createUser(defaultUser)
      await repository.createUser({
        username: 'test2',
        email: 'test2@mail.com',
        fullName: 'Test2 tested',
        password: 'test2',
      })

      await expect(
        repository.updateUser(created.id, {
          email: 'test2@mail.com',
        }),
      ).rejects.toThrow()
    })

    it('should not update a non existent user', async () => {
      await expect(
        repository.updateUser('non-existent', {
          username: 'test2',
        }),
      ).rejects.toThrow()
    })

    it('should be able to update with the same username', async () => {
      const created = await repository.createUser(defaultUser)
      const updated = await repository.updateUser(created.id, {
        username: defaultUser.username,
      })

      expect(updated).toBeDefined()
      expect(updated).toStrictEqual({
        ...defaultUser,
        password: undefined,
        id: created.id,
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should be able to update with the same email', async () => {
      const created = await repository.createUser(defaultUser)
      const updated = await repository.updateUser(created.id, {
        email: defaultUser.email,
      })

      expect(updated).toBeDefined()
      expect(updated).toStrictEqual({
        ...defaultUser,
        password: undefined,
        id: created.id,
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
      const created = await repository.createUser(defaultUser)
      const deleted = await repository.deleteUser(created.id)

      expect(deleted).toBeDefined()
      expect(deleted).toStrictEqual({
        ...defaultUser,
        password: undefined,
        id: created.id,
        profilePicture: undefined,
        biography: undefined,
        emailVerified: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should not delete a non existent user', async () => {
      await expect(repository.deleteUser('non-existent')).rejects.toThrow()
    })
  })
})
