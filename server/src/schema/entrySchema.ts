import z from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, "Title cant be emptt"),
  synopsis: z.string().min(1, "Synopsis cant be empty"),
  content: z.string().min(1, "Content cant be empty"),
  isPinned: z.boolean().optional(),
  isBookMarked: z.boolean().optional(),
});
