import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/hashPassword";
import { registrationSchema } from "../schema/registrationSchema";
import { loginSchema } from "../schema/loginSchema";
import { comparePassword } from "../utils/comparePassword";
import jwt from "jsonwebtoken";

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

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate login reqs
    const validatedPasswordReq = loginSchema.parse(req.body);

    const { userName, email, password } = validatedPasswordReq;

    const user = await client.user.findFirst({
      where: {
        OR: [{ userName }, { email }],
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found. Please confirm your login details.",
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      userName: user.userName,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET!);

    res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
