import { IPostRepository } from "../../ipost.repository";
import { Post } from "../../../entities/post.entity";
import { prisma } from "../../../lib/prisma";
import { createPostDTO } from "../../../dtos/post/create-post.dto";
import { updatePostDTO } from "../../../dtos/post/update-post.dto";

const PrismaPostRepository: IPostRepository = {
  getPostById: async (
    id: string
  ): Promise<{
    ok: boolean;
    message: string;
    payload: Post | undefined;
  }> => {
    const post = await prisma.post.findUniqueOrThrow({
      where: { id },
    });
    return {
      ok: true,
      message: "Post found",
      payload: post,
    };
  },
  getPosts: async (): Promise<{
    ok: boolean;
    message: string;
    payload: Post[] | undefined;
  }> => {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "asc" },
    });
    return {
      ok: true,
      message: "Posts found",
      payload: posts.map((post) => {
        return {
          id: post.id,
          subTitle: post.subTitle,
          userId: post.userId,
          imageId: post.imageId,
        };
      }),
    };
  },
  createPost: async (
    post: createPostDTO
  ): Promise<{
    ok: boolean;
    message: string;
    payload: Post | undefined;
  }> => {
    const createdPost = await prisma.post.create({
      data: {
        subTitle: post.subTitle,
        userId: post.userId,
        imageId: post.imageId,
      },
    });
    return {
      ok: true,
      message: "Post created",
      payload: createdPost,
    };
  },
  updatePost: async (
    id: string,
    post: Partial<updatePostDTO>
  ): Promise<{
    ok: boolean;
    message: string;
    payload: Post | undefined;
  }> => {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        subTitle: post.subTitle,
      },
    });
    return {
      ok: true,
      message: "Post updated",
      payload: updatedPost,
    };
  },
  deletePost: async (
    id: string
  ): Promise<{
    ok: boolean;
    message: string;
    payload: Post | undefined;
  }> => {
    const deletedPost = await prisma.post.delete({
      where: { id },
    });
    return {
      ok: true,
      message: "Post deleted",
      payload: undefined,
    };
  },
};

export { PrismaPostRepository };
