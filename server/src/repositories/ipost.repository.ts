import { CreatePostDTO } from "../dtos/post/create-post.dto";
import { UpdatePostDTO } from "../dtos/post/update-post.dto";
import { Post } from "../entities/post.entity";

interface IPostRepository {
  createPost(post: CreatePostDTO): Promise<Post>;
  getPostById(id: string): Promise<Post | undefined>;
  getPostsByUserId(userId: string): Promise<Post[]>;
  getPosts(): Promise<Post[]>;
  updatePost(id: string, post: UpdatePostDTO): Promise<Post>;
  deletePost(id: string): Promise<Post>;
}

export { IPostRepository };
