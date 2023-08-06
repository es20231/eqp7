import { CreateCommentDTO } from '../dtos/comment/create-comment.dto'
import { Comment } from '../entities/comment.entity'

interface ICommentRepository {
  createComment(comment: CreateCommentDTO): Promise<Comment>
  getCommentById(id: string): Promise<Comment | undefined>
  getCommentsByUserId(userId: string): Promise<Comment[]>
  getCommentsByPostId(postId: string): Promise<Comment[]>
  getComments(): Promise<Comment[]>
  deleteComment(id: string): Promise<Comment>
}

export { ICommentRepository }
