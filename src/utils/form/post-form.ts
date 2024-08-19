import { z } from "zod";

export const createPostFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 character(s)")
    .max(255, "Title cannot be more than 255 character(s)"),
  content: z.string().min(1, "Content cannot be empty"),
});

export const editPostFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 character(s)")
    .max(255, "Title cannot be more than 255 character(s)")
    .optional(),
  content: z.string().min(1, "Content cannot be empty").optional(),
});
