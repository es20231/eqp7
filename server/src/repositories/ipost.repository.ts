import { CreatePostDTO } from "../dtos/posts/create-post.dto";
import { Post } from "../entities/post.entity";

interface IPostRepository {
  createPost(post: CreatePostDTO): Promise<Post>;
  getPostById(id: string): Promise<Post | undefined>;
  getPosts(): Promise<Post[]>;
  updatePost(id: string, post: Post): Promise<Post>;
  deletePost(id: string): Promise<Post>;
}

export { IPostRepository };
