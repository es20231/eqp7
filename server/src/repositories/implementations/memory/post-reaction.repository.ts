import { PostReaction } from '../../../entities/post-reaction.entity'
import { delay, generateRandomId } from '../../../utils'
import { IPostReactionRepository } from '../../ipost-reaction.repository'

const postReactions = [] as PostReaction[]
const MemoryPostReactionRepository: IPostReactionRepository = {
  getPostReactionById: async (id: string) => {
    await delay()

    const postReaction = postReactions.find(
      (postReaction) => postReaction.id === id,
    )
    return postReaction || undefined
  },
  getPostReactions: async (type?: string, take?: number, skip?: number) => {
    await delay()

    if (type && !take && !skip)
      return postReactions.filter((postReaction) => postReaction.type === type)
    if (!type && take && !skip) return postReactions.slice(0, take)
    if (!type && !take && skip) return postReactions.slice(skip)
    if (type && take && !skip)
      return postReactions
        .filter((postReaction) => postReaction.type === type)
        .slice(0, take)
    if (type && !take && skip)
      return postReactions
        .filter((postReaction) => postReaction.type === type)
        .slice(skip)
    if (!type && take && skip) return postReactions.slice(skip, skip + take)
    if (type && take && skip)
      return postReactions
        .filter((postReaction) => postReaction.type === type)
        .slice(skip, skip + take)
    return postReactions
  },
  getPostReactionsByUserId: async (
    userId: string,
    type?: string,
    take?: number,
    skip?: number,
  ) => {
    await delay()

    if (type && !take && !skip)
      return postReactions.filter(
        (postReaction) =>
          postReaction.type === type && postReaction.userId === userId,
      )
    if (!type && take && !skip)
      return postReactions
        .filter((postReaction) => postReaction.userId === userId)
        .slice(0, take)
    if (!type && !take && skip)
      return postReactions
        .filter((postReaction) => postReaction.userId === userId)
        .slice(skip)
    if (type && take && !skip)
      return postReactions
        .filter(
          (postReaction) =>
            postReaction.type === type && postReaction.userId === userId,
        )
        .slice(0, take)
    if (type && !take && skip)
      return postReactions
        .filter(
          (postReaction) =>
            postReaction.type === type && postReaction.userId === userId,
        )
        .slice(skip)
    if (!type && take && skip)
      return postReactions
        .filter((postReaction) => postReaction.userId === userId)
        .slice(skip, skip + take)
    if (type && take && skip)
      return postReactions
        .filter(
          (postReaction) =>
            postReaction.type === type && postReaction.userId === userId,
        )
        .slice(skip, skip + take)
    return postReactions
  },
  getPostReactionsByPostId: async (
    postId: string,
    type?: string,
    take?: number,
    skip?: number,
  ) => {
    await delay()

    if (type && !take && !skip)
      return postReactions.filter(
        (postReaction) =>
          postReaction.type === type && postReaction.postId === postId,
      )
    if (!type && take && !skip)
      return postReactions
        .filter((postReaction) => postReaction.postId === postId)
        .slice(0, take)
    if (!type && !take && skip)
      return postReactions
        .filter((postReaction) => postReaction.postId === postId)
        .slice(skip)
    if (type && take && !skip)
      return postReactions
        .filter(
          (postReaction) =>
            postReaction.type === type && postReaction.postId === postId,
        )
        .slice(0, take)
    if (type && !take && skip)
      return postReactions
        .filter(
          (postReaction) =>
            postReaction.type === type && postReaction.postId === postId,
        )
        .slice(skip)
    if (!type && take && skip)
      return postReactions
        .filter((postReaction) => postReaction.postId === postId)
        .slice(skip, skip + take)
    if (type && take && skip)
      return postReactions
        .filter(
          (postReaction) =>
            postReaction.type === type && postReaction.postId === postId,
        )
        .slice(skip, skip + take)
    return postReactions
  },
  createPostReaction: async (postReaction: PostReaction) => {
    await delay()

    const createdPostReaction = {
      ...postReaction,
      id: generateRandomId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as PostReaction
    postReactions.push(createdPostReaction)
    return createdPostReaction
  },
  deletePostReaction: async (id: string) => {
    await delay()

    const postReactionIndex = postReactions.findIndex(
      (postReaction) => postReaction.id === id,
    )
    if (postReactionIndex < 0) throw new Error('PostReaction not found')
    const deletedPostReaction = postReactions.splice(postReactionIndex, 1)[0]
    return deletedPostReaction
  },
}

const clearPostReactionsMemory = async () => {
  await delay()
  postReactions.splice(0, postReactions.length)
}

export { MemoryPostReactionRepository, clearPostReactionsMemory }
