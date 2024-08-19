import { errorMiddleware } from "@/utils/middleware/error-middleware";
import { CreatePostRequest } from "@/utils/model/post-model";
import { ApiResponse } from "@/utils/response/response";
import { PostService } from "@/utils/service/post-service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const request: CreatePostRequest = req.body as CreatePostRequest;
      const response = await PostService.create(request);

      const apiResponse = new ApiResponse(
        "success",
        201,
        "Post created successfully",
        response,
      );

      res.status(201).json(apiResponse.toJson());
    } catch (error) {
      errorMiddleware(error as Error, res);
    }
  } else if (req.method === "GET") {
    try {
      const response = await PostService.get();

      const apiResponse = new ApiResponse(
        "success",
        200,
        "Posts retrieved successfully",
        response,
      );
      res.status(200).json(apiResponse.toJson());
    } catch (error) {
      errorMiddleware(error as Error, res);
    }
  } else {
    res.status(405).json({
      status: "error",
      code: 405,
      message: "Method Not Allowed",
    });
  }
}
