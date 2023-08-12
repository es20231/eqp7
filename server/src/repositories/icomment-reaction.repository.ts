import { CreateCommentReactionDTO } from '../dtos/comment-reaction/create-comment-reaction.dto'
import { CommentReaction } from '../entities/comment-reaction.entity'

interface ICommentReactionRepository {
  createCommentReaction(
    commentReaction: CreateCommentReactionDTO,
  ): Promise<CommentReaction>
  getCommentReactionById(id: string): Promise<CommentReaction | undefined>
  getCommentReactionsByUserId(
    userId: string,
    type?: string,
    take?: number,
    skip?: number,
  ): Promise<CommentReaction[]>
  getCommentReactionsByCommentId(
    commentId: string,
    type?: string,
    take?: number,
    skip?: number,
  ): Promise<CommentReaction[]>
  getCommentReactions(
    type?: string,
    take?: number,
    skip?: number,
  ): Promise<CommentReaction[]>
  deleteCommentReaction(id: string): Promise<CommentReaction>
}

export { ICommentReactionRepository }
