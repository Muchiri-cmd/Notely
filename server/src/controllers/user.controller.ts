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

const getCurrentUser = async (req: AuthorizedRequest, res: Response) => {
  const userId = (req as any).user?.id;

  if (!userId)
    return res.status(400).json({ message: "User ID not found in token" });

  try {
    const user = await client.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
        avatar: true,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export { updateUser, getCurrentUser };
