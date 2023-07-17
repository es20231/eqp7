import { Post } from "../entities/post.entity";

type RepositoryResult<T> = {
  ok: boolean;
  message: string;
  payload: T | undefined;
};

interface IPostRepository {
  getPostById(id: string): Promise<RepositoryResult<Post>>;
  getPosts(): Promise<RepositoryResult<Post[]>>;
  createPost(post: Post): Promise<RepositoryResult<Post>>;
  updatePost(id: string, post: Partial<Post>): Promise<RepositoryResult<Post>>;
  deletePost(id: string): Promise<RepositoryResult<Post>>;
}

export { IPostRepository };
