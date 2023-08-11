import { CreateCommentDTO } from '../dtos/comment/create-comment.dto'
import { Comment } from '../entities/comment.entity'

interface ICommentRepository {
  createComment(comment: CreateCommentDTO): Promise<Comment>
  getCommentById(id: string): Promise<Comment | undefined>
  getCommentsByUserId(
    userId: string,
    take?: number,
    skip?: number,
  ): Promise<Comment[]>
  getCommentsByPostId(
    postId: string,
    take?: number,
    skip?: number,
  ): Promise<Comment[]>
  getComments(take?: number, skip?: number): Promise<Comment[]>
  deleteComment(id: string): Promise<Comment>
}

export { ICommentRepository }
