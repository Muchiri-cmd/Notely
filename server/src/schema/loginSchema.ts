import z from "zod";
export const loginSchema = z
  .object({
    email: z.string().email("Invalid email format").optional(),
    userName: z.string().optional(),
    password: z.string(),
  })
  .refine((data) => data.userName || data.email, {
    message: "Username or email is required to login",
  });
