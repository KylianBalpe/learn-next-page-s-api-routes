import { ResponseError } from "@/utils/response/response";
import type { NextApiResponse } from "next";
import { ZodError } from "zod";

export const errorHandler = (error: Error, res: NextApiResponse) => {
  if (error instanceof ZodError) {
    const errorMessage = error.errors
      .map((error) => {
        return error.message;
      })
      .join(", ");
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Validation Error",
      errors: errorMessage,
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
