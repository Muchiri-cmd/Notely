import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/hashPassword";
import { registrationSchema } from "../schema/registrationSchema";
import { loginSchema } from "../schema/loginSchema";
import { comparePassword } from "../utils/comparePassword";
import jwt from "jsonwebtoken";
import { AuthorizedRequest } from "../middleware/auth.middleware";
import { passwordSchema } from "../schema/passwordSchema";

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

    const existingEmail = await client.user.findUnique({
      where: {
        email,
      },
    });

    const existingUserName = await client.user.findFirst({
      where: {
        userName,
      },
    });

    if (existingEmail) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }

    if (existingUserName) {
      res.status(409).json({ error: "Username already taken" });
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
    // console.log(req.body)
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
      return res
        .status(401)
        .json({ error: "Wrong password, please confirm your password" });
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

const logoutUser = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  res.status(200).json({
    message: "Logout successful.",
  });
};

const updatePassword = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { current_password, password } = passwordSchema.parse(req.body);
    const id = req.user?.id;

    const user = await client.user.findUnique({
      where: { id },
    });

    if (!user?.password) {
      return;
    }

    //verify current
    const isPasswordValid = await comparePassword(
      current_password,
      user?.password,
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong current password" });
    }

    const hashedPassword = await hashPassword(password);

    await client.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, logoutUser, updatePassword };
