import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(`[${req.method}] ${req.url}`, error);
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }
};
