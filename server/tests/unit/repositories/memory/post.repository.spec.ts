import {
  clearPostMemory,
  MemoryPostRepository,
} from '../../../../src/repositories/implementations/memory/post.repository'

describe('MemoryPostRepository', () => {
  const repository = MemoryPostRepository
  const userId = 'user-test-id'
  const imageId = 'image-test-id'
  it('should be defined', () => {
    expect(repository).toBeTruthy()
  })
  afterEach(async () => await clearPostMemory())
  it('should create a post', async () => {
    const post = {
      subtitle: 'Post Title',
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
  it('should get a post by id', async () => {
    const post = {
      subtitle: 'Post Title',
      userId,
      imageId,
    }
    const created = await repository.createPost(post)
    const { id } = created
    const finded = await repository.getPostById(id)
    expect(finded).toBeTruthy()
    expect(finded).toStrictEqual({
      id,
      subtitle: post.subtitle,
      userId: post.userId,
      imageId: post.imageId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
  it('should return undefined when try to get a post by non existent id', async () => {
    const post = await repository.getPostById('non-existent-id')
    expect(post).toBeUndefined()
  })
  it('should get all posts', async () => {
    const post1 = {
      subtitle: 'Post Title',
      userId,
      imageId,
    }
    const post2 = {
      subtitle: 'Post Title',
      userId,
      imageId,
    }
    await repository.createPost(post1)
    await repository.createPost(post2)
    const posts = await repository.getPosts()
    expect(posts).toBeTruthy()
    expect(posts).toHaveLength(2)
    expect(posts).toStrictEqual([
      {
        id: expect.any(String),
        subtitle: post1.subtitle,
        userId: post1.userId,
        imageId: post1.imageId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
      {
        id: expect.any(String),
        subtitle: post2.subtitle,
        userId: post2.userId,
        imageId: post2.imageId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ])
  })
  it('should get all posts by user id', async () => {
    const post1 = {
      subtitle: 'Post Title',
      userId,
      imageId,
    }
    const post2 = {
      subtitle: 'Post Title',
      userId,
      imageId,
    }
    const post3 = {
      subtitle: 'Post Title',
      userId: 'another-user-id',
      imageId,
    }
    await repository.createPost(post1)
    await repository.createPost(post2)
    await repository.createPost(post3)
    const posts = await repository.getPostsByUserId(userId)
    expect(posts).toBeTruthy()
    expect(posts).toHaveLength(2)
    expect(posts).toStrictEqual([
      {
        id: expect.any(String),
        subtitle: post1.subtitle,
        userId: post1.userId,
        imageId: post1.imageId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
      {
        id: expect.any(String),
        subtitle: post2.subtitle,
        userId: post2.userId,
        imageId: post2.imageId,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ])
  })
  it('should update a post', async () => {
    const post = {
      subtitle: 'Post Title',
      userId: 'post-id',
      imageId: 'image-id',
    }
    const created = await repository.createPost(post)
    const { id } = created
    const updated = await repository.updatePost(id, {
      subtitle: 'Updated Post Title',
    })
    expect(updated).toBeTruthy()
    expect(updated).toStrictEqual({
      id,
      subtitle: 'Updated Post Title',
      userId: 'post-id',
      imageId: 'image-id',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
  it('should throw an error when try to update a post by non existent id', async () => {
    await expect(
      repository.updatePost('non-existent-id', {
        subtitle: 'Updated Post Title',
      }),
    ).rejects.toThrow()
  })
  it('should be able to update a post with the same subtitle', async () => {
    const post = {
      subtitle: 'Post Title',
      userId: 'post-id',
      imageId: 'image-id',
    }
    const created = await repository.createPost(post)
    const { id } = created
    const updated = await repository.updatePost(id, {
      subtitle: 'Post Title',
    })
    expect(updated).toBeTruthy()
    expect(updated).toStrictEqual({
      id,
      subtitle: 'Post Title',
      userId: 'post-id',
      imageId: 'image-id',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
  it('should be able to update a post with the same image id', async () => {
    const post = {
      subtitle: 'Post Title',
      userId: 'post-id',
      imageId: 'image-id',
    }
    const created = await repository.createPost(post)
    const { id } = created
    const updated = await repository.updatePost(id, {
      imageId: 'image-id',
    })
    expect(updated).toBeTruthy()
    expect(updated).toStrictEqual({
      id,
      subtitle: 'Post Title',
      userId: 'post-id',
      imageId: 'image-id',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
  it('should be able to update a post with the same user id', async () => {
    const post = {
      subtitle: 'Post Title',
      userId: 'post-id',
      imageId: 'image-id',
    }
    const created = await repository.createPost(post)
    const { id } = created
    const updated = await repository.updatePost(id, {
      userId: 'post-id',
    })
    expect(updated).toBeTruthy()
    expect(updated).toStrictEqual({
      id,
      subtitle: 'Post Title',
      userId: 'post-id',
      imageId: 'image-id',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
  it('should delete a post', async () => {
    const post = {
      subtitle: 'Post Title',
      userId,
      imageId,
    }
    const created = await repository.createPost(post)
    const { id } = created
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
  it('should throw an error when try to delete a post by non existent id', async () => {
    await expect(repository.deletePost('non-existent-id')).rejects.toThrow()
  })
})
