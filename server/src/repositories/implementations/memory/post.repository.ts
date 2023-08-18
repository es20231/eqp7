import { CreatePostDTO } from '../../../dtos/post/create-post.dto'
import { UpdatePostDTO } from '../../../dtos/post/update-post.dto'
import { Post } from '../../../entities/post.entity'
import { delay, generateRandomId } from '../../../utils'
import { IPostRepository } from '../../ipost.repository'

const posts = [] as Post[]

const MemoryPostRepository: IPostRepository = {
  getPostById: async (id: string) => {
    await delay()
    const post = posts.find((post) => post.id === id)

    return post || undefined
  },
  getPosts: async (take?: number, skip?: number) => {
    await delay()
    if (!take && skip) return posts.slice(skip)
    if (take && !skip) return posts.slice(0, take)
    if (take && skip) return posts.slice(skip, skip + take)
    return posts
  },
  getPostsByUserId: async (userId: string, take?: number, skip?: number) => {
    await delay()
    const userPosts = posts.filter((post) => post.userId === userId)
    if (!take && skip) return userPosts.slice(skip)
    if (take && !skip) return userPosts.slice(0, take)
    if (take && skip) return userPosts.slice(skip, skip + take)
    return userPosts
  },
  createPost: async (post: CreatePostDTO) => {
    await delay()
    const createdPost = {
      ...post,
      id: generateRandomId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Post
    posts.push(createdPost)
    return createdPost
  },
  updatePost: async (id: string, post: UpdatePostDTO) => {
    await delay()
    const postIndex = posts.findIndex((post) => post.id === id)
    if (postIndex < 0) throw new Error('Post not found')
    const updatedPost = {
      ...posts[postIndex],
      ...post,
      updatedAt: new Date(),
    } as Post
    posts[postIndex] = updatedPost
    return updatedPost
  },
  deletePost: async (id: string) => {
    await delay()
    const postIndex = posts.findIndex((post) => post.id === id)
    if (postIndex < 0) throw new Error('Post not found')
    const deletedPost = posts.splice(postIndex, 1)[0]
    return deletedPost
  },
}

const clearPostMemory = async () => {
  await delay()
  posts.splice(0, posts.length)
}

export { MemoryPostRepository, clearPostMemory }
