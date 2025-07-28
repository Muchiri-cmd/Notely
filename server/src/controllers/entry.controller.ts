import { PrismaClient } from "@prisma/client";
import { NextFunction, Response } from "express";
import { AuthorizedRequest } from "../middleware/auth.middleware";
import { noteSchema } from "../schema/entrySchema";
// import { pipeline } from "@xenova/transformers";
// import { loadSummarizer } from "../utils/summarizer";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY
});


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
    const { title, synopsis, content, isPinned, isBookMarked } =
      validatedRequest;

    const updatedEntry = await client.entry.update({
      where: { id },
      data: {
        title,
        synopsis,
        content,
        isPinned,
        isBookMarked,
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
    const id = req?.user?.id;
    // console.log('id',id)
    const deletedEntries = await client.entry.findMany({
      where: {
        isDeleted: true,
        writerId: id,
      },
    });

    // console.log("Deleted Entries:", deletedEntries)
    res.status(200).json(deletedEntries);
  } catch (error) {
    next(error);
  }
};

const summarizeText = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { content } = req.body;

  try {
    // const pipe = await loadSummarizer();

    // const response = await pipe(content);
    // const summary = (response[0] as { summary_text: string }).summary_text;
    // res.status(200).json({ summary });
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Summarize the following note in the simplest , most concise way but covering all key points for writer to read:\n\n${content}`,
            },
          ],
        },
      ],
    });
    const summary = result.text;
    // console.log("summary:",summary)

    res.status(200).json({ summary });

  } catch (error) {
    next(error);
  }
};

const askAI = async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const { content, question } = req.body;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Here is a note:\n\n${content}`,
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: `Question: ${question}`,
            },
          ],
        },
      ],
    });

    const answer = result.text;
    res.status(200).json({ answer });
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
  summarizeText,
  askAI
};
