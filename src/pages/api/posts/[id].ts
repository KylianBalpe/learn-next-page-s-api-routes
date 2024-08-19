import { errorHandler } from "@/utils/middleware/error-handler";
import { UpdatePostRequest } from "@/utils/model/post-model";
import { ApiResponse } from "@/utils/response/response";
import { PostService } from "@/utils/service/post-service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const response = await PostService.getById(Number(id));

      const apiResponse = new ApiResponse(
        "success",
        200,
        "Post retrieved successfully",
        response,
      );

      res.status(200).json(apiResponse.toJson());
    } catch (error) {
      errorHandler(error as Error, res);
    }
  } else if (req.method === "PUT") {
    try {
      const request: UpdatePostRequest = req.body as UpdatePostRequest;
      request.id = Number(req.query.id);
      const response = await PostService.update(request);

      const apiResponse = new ApiResponse(
        "success",
        200,
        "Post updated successfully",
        response,
      );
      res.status(200).json(apiResponse.toJson());
    } catch (error) {
      errorHandler(error as Error, res);
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const response = await PostService.delete(Number(id));

      const apiResponse = new ApiResponse(
        "success",
        200,
        "Post deleted successfully",
        response,
      );

      res.status(200).json(apiResponse.toJson());
    } catch (error) {
      errorHandler(error as Error, res);
    }
  } else {
    res.status(405).json({
      status: "error",
      code: 405,
      message: "Method Not Allowed",
    });
  }
}
