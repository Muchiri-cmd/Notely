import z from "zod";

export const noteSchema = z.object({
  title: z.string(),
  synopsis: z.string(),
  content: z.string(),
});
