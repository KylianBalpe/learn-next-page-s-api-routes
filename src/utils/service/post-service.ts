import {
  CreatePostRequest,
  PostResponse,
  toPostResponse,
  UpdatePostRequest,
} from "@/utils/model/post-model";
import { Validation } from "@/utils/validation/validation";
import { PostValidation } from "@/utils/validation/post-validation";
import { db } from "@/utils/database/prisma";
import { Posts } from "@prisma/client";
import { ResponseError } from "@/utils/response/response";

export class PostService {
  static async isPostExists(id: number): Promise<Posts> {
    const post = await db.posts.findUnique({
      where: { id: id },
    });

    if (!post || post.deletedAt) {
      throw new ResponseError("error", 404, "Post not found");
    }

    return post;
  }

  static async create(request: CreatePostRequest): Promise<PostResponse> {
    const createRequest: CreatePostRequest = Validation.validate(
      PostValidation.CREATE,
      request,
    );

    const post = await db.posts.create({
      data: createRequest,
    });

    return toPostResponse(post);
  }

  static async get(): Promise<PostResponse[]> {
    const posts = await db.posts.findMany({
      where: { deletedAt: null },
    });

    return posts.map((post: Posts) => toPostResponse(post));
  }

  static async getById(id: number): Promise<PostResponse> {
    const post = await this.isPostExists(id);

    return toPostResponse(post);
  }

  static async update(request: UpdatePostRequest): Promise<PostResponse> {
    const updateRequest: UpdatePostRequest = Validation.validate(
      PostValidation.UPDATE,
      request,
    );
    const postExist = await this.isPostExists(updateRequest.id);

    const post = await db.posts.update({
      where: { id: postExist.id },
      data: updateRequest,
    });

    return toPostResponse(post);
  }

  static async delete(id: number): Promise<PostResponse> {
    const postExist = await this.isPostExists(id);

    const post = await db.posts.update({
      where: { id: postExist.id },
      data: { deletedAt: new Date() },
    });

    return toPostResponse(post);
  }
}
