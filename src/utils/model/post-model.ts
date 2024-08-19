import { Posts } from "@prisma/client";

export type PostResponse = {
  id: number;
  title: string;
  content: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatePostRequest = {
  title: string;
  content: string;
};

export type UpdatePostRequest = {
  id: number;
  title?: string;
  content?: string;
};

export const toPostResponse = (post: Posts): PostResponse => {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    deletedAt: post.deletedAt?.toISOString() || undefined,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
};
