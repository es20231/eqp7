import { CreatePostDTO } from "../../../dtos/posts/create-post.dto";
import { UpdatePostDTO } from "../../../dtos/posts/update-post.dto";
import { Post } from "../../../entities/post.entity";
import { delay, generateRandomId } from "../../../utils";
import { IPostRepository } from "../../ipost.repository";

const posts = [] as Post[];

const MemoryPostRepository: IPostRepository = {
  getPostById: async (id: string) => {
    await delay();
    const post = posts.find((post) => post.id === id);
    if (!post) throw new Error("Post not found");
    return post;
  },
  getPosts: async () => {
    await delay();
    return posts;
  },
  createPost: async (post: CreatePostDTO) => {
    await delay();
    const createdPost = {
      ...post,
      id: generateRandomId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Post;
    posts.push(createdPost);
    return createdPost;
  },
  updatePost: async (id: string, post: UpdatePostDTO) => {
    await delay();
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex < 0) throw new Error("Post not found");
    const updatedPost = {
      ...posts[postIndex],
      ...post,
      updatedAt: new Date(),
    } as Post;
    posts[postIndex] = updatedPost;
    return updatedPost;
  },
  deletePost: async (id: string) => {
    await delay();
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex < 0) throw new Error("Post not found");
    const deletedPost = posts.splice(postIndex, 1)[0];
    return deletedPost;
  },
};

export { MemoryPostRepository };
