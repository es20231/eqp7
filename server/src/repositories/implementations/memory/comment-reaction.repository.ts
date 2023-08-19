import { CreateCommentReactionDTO } from '../../../dtos/comment-reaction/create-comment-reaction.dto'
import { CommentReaction } from '../../../entities/comment-reaction.entity'
import { delay, generateRandomId } from '../../../utils'
import { ICommentReactionRepository } from '../../icomment-reaction.repository'

const commentReactions = [] as CommentReaction[]
const MemoryCommentReactionRepository: ICommentReactionRepository = {
  getCommentReactionById: async (id: string) => {
    await delay()

    const commentReaction = commentReactions.find(
      (commentReaction) => commentReaction.id === id,
    )
    return commentReaction || undefined
  },
  getCommentReactions: async (type?: string, take?: number, skip?: number) => {
    await delay()

    if (type && !take && !skip)
      return commentReactions.filter(
        (commentReaction) => commentReaction.type === type,
      )
    if (!type && take && !skip) return commentReactions.slice(0, take)
    if (!type && !take && skip) return commentReactions.slice(skip)
    if (type && take && !skip)
      return commentReactions
        .filter((commentReaction) => commentReaction.type === type)
        .slice(0, take)
    if (type && !take && skip)
      return commentReactions
        .filter((commentReaction) => commentReaction.type === type)
        .slice(skip)
    if (!type && take && skip) return commentReactions.slice(skip, skip + take)
    if (type && take && skip)
      return commentReactions
        .filter((commentReaction) => commentReaction.type === type)
        .slice(skip, skip + take)
    return commentReactions
  },
  getCommentReactionsByUserId: async (
    userId: string,
    type?: string,
    take?: number,
    skip?: number,
  ) => {
    await delay()

    if (type && !take && !skip)
      return commentReactions.filter(
        (commentReaction) =>
          commentReaction.type === type && commentReaction.userId === userId,
      )
    if (!type && take && !skip)
      return commentReactions
        .filter((commentReaction) => commentReaction.userId === userId)
        .slice(0, take)
    if (!type && !take && skip)
      return commentReactions
        .filter((commentReaction) => commentReaction.userId === userId)
        .slice(skip)
    if (type && take && !skip)
      return commentReactions
        .filter(
          (commentReaction) =>
            commentReaction.type === type && commentReaction.userId === userId,
        )
        .slice(0, take)
    if (type && !take && skip)
      return commentReactions
        .filter(
          (commentReaction) =>
            commentReaction.type === type && commentReaction.userId === userId,
        )
        .slice(skip)
    if (!type && take && skip)
      return commentReactions
        .filter((commentReaction) => commentReaction.userId === userId)
        .slice(skip, skip + take)
    if (type && take && skip)
      return commentReactions
        .filter(
          (commentReaction) =>
            commentReaction.type === type && commentReaction.userId === userId,
        )
        .slice(skip, skip + take)
    return commentReactions.filter(
      (commentReaction) => commentReaction.userId === userId,
    )
  },
  getCommentReactionsByCommentId: async (
    commentId: string,
    type?: string,
    take?: number,
    skip?: number,
  ) => {
    await delay()

    if (type && !take && !skip)
      return commentReactions.filter(
        (commentReaction) =>
          commentReaction.type === type &&
          commentReaction.commentId === commentId,
      )
    if (!type && take && !skip)
      return commentReactions
        .filter((commentReaction) => commentReaction.commentId === commentId)
        .slice(0, take)
    if (!type && !take && skip)
      return commentReactions
        .filter((commentReaction) => commentReaction.commentId === commentId)
        .slice(skip)
    if (type && take && !skip)
      return commentReactions
        .filter(
          (commentReaction) =>
            commentReaction.type === type &&
            commentReaction.commentId === commentId,
        )
        .slice(0, take)
    if (type && !take && skip)
      return commentReactions
        .filter(
          (commentReaction) =>
            commentReaction.type === type &&
            commentReaction.commentId === commentId,
        )
        .slice(skip)
    if (!type && take && skip)
      return commentReactions
        .filter((commentReaction) => commentReaction.commentId === commentId)
        .slice(skip, skip + take)
    if (type && take && skip)
      return commentReactions
        .filter(
          (commentReaction) =>
            commentReaction.type === type &&
            commentReaction.commentId === commentId,
        )
        .slice(skip, skip + take)
    return commentReactions.filter(
      (commentReaction) => commentReaction.commentId === commentId,
    )
  },
  createCommentReaction: async (commentReaction: CreateCommentReactionDTO) => {
    await delay()

    const createdCommentReaction = {
      ...commentReaction,
      id: generateRandomId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CommentReaction
    commentReactions.push(createdCommentReaction)
    return createdCommentReaction
  },
  deleteCommentReaction: async (id: string) => {
    await delay()

    const commentReactionIndex = commentReactions.findIndex(
      (commentReaction) => commentReaction.id === id,
    )
    if (commentReactionIndex < 0) throw new Error('CommentReaction not found')
    const deletedCommentReaction = commentReactions.splice(
      commentReactionIndex,
      1,
    )[0]
    return deletedCommentReaction
  },
}

const clearCommentReactionsMemory = async () => {
  await delay()
  commentReactions.splice(0, commentReactions.length)
}

export { MemoryCommentReactionRepository, clearCommentReactionsMemory }
