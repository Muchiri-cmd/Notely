import z from "zod";
import zxcvbn from "zxcvbn";

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (val) => {
        const result = zxcvbn(val);
        return result.score >= 2;
      },
      {
        message:
          "Password is too weak. Try adding symbols, numbers, or more words.",
      },
    ),
  current_password: z.string().min(8, "Password must be at least 8 characters"),
});
