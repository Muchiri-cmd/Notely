import { z } from "zod";
import zxcvbn from "zxcvbn";

export const registrationSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters long")
    .refine(
      (val) => {
        const password = zxcvbn(val);
        return password.score >= 2;
      },
      {
        message:
          "Password is too weak. Make sure to include atleast 8 special character, numbers, upper and lowercase letters",
      },
    ),
  avatar: z.string(),
  userName: z.string().min(1, "Username must be atleast 1 character"),
  lastName: z.string().min(2, "Name must be atleast 2 characters"),
  firstName: z.string().min(2, "Name must be atleast 2 characters"),
});
