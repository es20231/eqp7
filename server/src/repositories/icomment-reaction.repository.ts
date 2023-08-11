import { CreateCommentReactionDTO } from '../dtos/comment-reaction/create-comment-reaction.dto'
import { CommentReaction } from '../entities/comment-reaction.entity'

interface ICommentReactionRepository {
  createCommentReaction(
    commentReaction: CreateCommentReactionDTO,
  ): Promise<CommentReaction>
  getCommentReactionById(id: string): Promise<CommentReaction | undefined>
  getCommentReactionsByUserId(
    userId: string,
    take: number,
    skip: number,
  ): Promise<CommentReaction[]>
  getCommentReactionsByCommentId(
    commentId: string,
    take: number,
    skip: number,
  ): Promise<CommentReaction[]>
  getCommentReactions(take: number, skip: number): Promise<CommentReaction[]>
  getCommentsReactionByTypeAndUserId(
    type: string,
    userId: string,
    take: number,
    skip: number,
  ): Promise<CommentReaction[]>
  getCommentsReactionByTypeAndCommentId(
    type: string,
    commentId: string,
    take: number,
    skip: number,
  ): Promise<CommentReaction[]>
  deleteCommentReaction(id: string): Promise<CommentReaction>
}

export { ICommentReactionRepository }
