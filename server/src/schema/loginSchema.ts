import z from "zod";
export const loginSchema = z
  .object({
    email: z.string().email("Invalid email format").optional(),
    userName: z
      .string()
      .min(1, "Username must be atleast 1 character")
      .optional(),
    password: z.string().min(8, "Password set is atleast 8 characters"),
  })
  .refine((data) => data.userName || data.email, {
    message: "Username or email is required to login",
  });
