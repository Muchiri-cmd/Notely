import { PrismaClient } from "@prisma/client";
import { NextFunction, Response } from "express";
import { AuthorizedRequest } from "../middleware/auth.middleware";
import { noteSchema } from "../schema/entrySchema";

const client = new PrismaClient();

const createEntry = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedRequest = noteSchema.parse(req.body);
    const { title, synopsis, content } = validatedRequest;

    await client.entry.create({
      data: {
        title,
        synopsis,
        content,
        writer: {
          connect: { id: req.user?.id },
        },
      },
    });
    res.status(200).json({
      message: "Entry Created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllEntries = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.user?.id;
    const entries = await client.entry.findMany({
      where: {
        writerId: id,
        isDeleted: false,
      },
    });
    res.status(200).json(entries);
  } catch (error) {
    next(error);
  }
};

const getSingleEntry = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const entry = await client.entry.findUnique({
      where: {
        id,
      },
      include: {
        writer: {
          select: {
            userName: true,
            avatar: true,
            email: true,
          },
        },
      },
    });
    entry
      ? res.status(200).json(entry)
      : res.status(404).json({
          message: "Entry not found",
        });
  } catch (error) {
    next(error);
  }
};

const updateEntry = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const validatedRequest = noteSchema.parse(req.body);
    const { title, synopsis, content } = validatedRequest;

    const updatedEntry = await client.entry.update({
      where: { id },
      data: {
        title,
        synopsis,
        content,
      },
    });

    res.status(200).json(updatedEntry);
  } catch (error) {
    next(error);
  }
};

const softDeleteEntry = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await client.entry.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
    res.status(200).json({ message: "Entry soft deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const restoreDeletedEntry = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await client.entry.update({
      where: { id },
      data: {
        isDeleted: false,
      },
    });
    res.status(200).json({ message: "Entry restored successfuly" });
  } catch (error) {
    next(error);
  }
};

const deleteEntry = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await client.entry.delete({
      where: { id },
    });
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getDeletedEntries = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedEntries = await client.entry.findMany({
      where: {
        isDeleted: true,
      },
    });

    // console.log("Deleted Entries:", deletedEntries)
    res.status(200).json(deletedEntries);
  } catch (error) {
    next(error);
  }
};
export {
  createEntry,
  getAllEntries,
  getSingleEntry,
  updateEntry,
  softDeleteEntry,
  restoreDeletedEntry,
  deleteEntry,
  getDeletedEntries,
};
