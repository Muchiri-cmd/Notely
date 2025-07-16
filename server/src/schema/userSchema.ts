import z from "zod";

export const userSchema = z.object({
  avatar: z.string(),
  userName: z.string().min(1, "Username must be atleast 1 character"),
  lastName: z.string().min(2, "Name must be atleast 2 characters"),
  firstName: z.string().min(2, "Name must be atleast 2 characters"),
});
