import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/hashPassword";
import { registrationSchema } from "../schema/registrationSchema";
import { ZodError } from "zod";

const client = new PrismaClient();

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //Validate request
    const validatedReq = registrationSchema.parse(req.body);

    const { firstName, lastName, email, userName, password, avatar } =
      validatedReq;

    const existingUser = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    await client.user.create({
      data: {
        firstName,
        lastName,
        email,
        userName,
        password: hashedPassword,
        avatar,
      },
    });
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser };
