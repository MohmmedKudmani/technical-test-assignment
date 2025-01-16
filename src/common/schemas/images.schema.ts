import { z } from "zod";

export const ImageSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  uploadDate: z.string(),
  metadata: z.object({
    size: z.string(),
    resolution: z.string(),
  }),
  categoryId: z.number(),
});

export const PostImageSchema = z.object({
  name: z.string(),
  url: z.string(),
  metadata: z.object({
    size: z.string(),
    resolution: z.string(),
  }),
  categoryId: z.number(),
});

export type ImageType = z.infer<typeof ImageSchema>;
export type PostImageType = z.infer<typeof PostImageSchema>;

