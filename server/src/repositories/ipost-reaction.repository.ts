import { CreatePostReactionDTO } from '../dtos/post-reaction/create-post-reaction.dto'
import { PostReaction } from '../entities/post-reaction.entity'

interface IPostReactionRepository {
  createPostReaction(postReaction: CreatePostReactionDTO): Promise<PostReaction>
  getPostReactionById(id: string): Promise<PostReaction | undefined>
  getPostReactionsByUserId(
    userId: string,
    type?: string,
    take?: number,
    skip?: number,
  ): Promise<PostReaction[]>
  getPostReactionsByPostId(
    postId: string,
    type?: string,
    take?: number,
    skip?: number,
  ): Promise<PostReaction[]>
  getPostReactions(
    type?: string,
    take?: number,
    skip?: number,
  ): Promise<PostReaction[]>
  deletePostReaction(id: string): Promise<PostReaction>
}

export { IPostReactionRepository }
