import { ResponseError } from "@/utils/response/response";
import type { NextApiResponse } from "next";
import { ZodError } from "zod";

export const errorMiddleware = (error: Error, res: NextApiResponse) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Validation Error",
      errors: error.errors.map((error) => {
        return error.message;
      }),
    });
  } else if (error instanceof ResponseError) {
    res.status(error.code).json({
      status: error.status,
      code: error.code,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};
