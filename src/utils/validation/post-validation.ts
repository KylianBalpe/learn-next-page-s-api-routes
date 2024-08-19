import { z, ZodType } from "zod";

export class PostValidation {
  static readonly CREATE: ZodType = z.object({
    title: z
      .string({ required_error: "Title cannot be empty" })
      .min(3, "Title must be at least 3 character(s)")
      .max(255, "Title cannot be more than 255 character(s)"),
    content: z.string().min(1),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number(),
    title: z
      .string({ required_error: "Title cannot be empty" })
      .min(3, "Title must be at least 3 character(s)")
      .max(255, "Title cannot be more than 255 character(s)")
      .optional(),
    content: z.string().min(1).optional(),
  });
}
