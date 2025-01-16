import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
});

export const PostCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
});

export type CategoryType = z.infer<typeof CategorySchema>;
export type PostCategoryType = z.infer<typeof PostCategorySchema>;

