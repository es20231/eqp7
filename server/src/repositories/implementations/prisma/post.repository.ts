import { CreatePostDTO } from "../../../dtos/posts/create-post.dto";
import { UpdatePostDTO } from "../../../dtos/posts/update-post.dto";
import { prisma } from "../../../lib/prisma";
import { IPostRepository } from "../../ipost.repository";

const PrismaPostRepository: IPostRepository = {
  getPostById: async (id: string) => {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    return post || undefined;
  },
  getPosts: async () => {
    const posts = await prisma.post.findMany();
    return posts;
  },
  createPost: async (post: CreatePostDTO) => {
    const createdPost = await prisma.post.create({
      data: {
        subTitle: post.subTitle,
        userId: post.userId,
        imageId: post.imageId,
      },
    });
    return createdPost;
  },
  updatePost: async (id: string, post: UpdatePostDTO) => {
    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        ...post,
      },
    });
    return updatedPost;
  },
  deletePost: async (id: string) => {
    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },
    });
    return deletedPost;
  },
};

export { PrismaPostRepository };
