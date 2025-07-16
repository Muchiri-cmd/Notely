import { AuthorizedRequest } from "../middleware/auth.middleware";
import { Response, NextFunction } from "express";

import { PrismaClient } from "@prisma/client";
import { userSchema } from "../schema/userSchema";
const client = new PrismaClient();

const updateUser = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;
    const validatedRequest = userSchema.parse(req.body);

    const { firstName, lastName, userName, avatar } = validatedRequest;

    await client.user.update({
      where: {
        id: id,
      },
      data: {
        firstName,
        lastName,
        userName,
        avatar,
      },
    });
    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { updateUser };
