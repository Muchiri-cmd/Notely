import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import entryRouter from "./routes/entry.routes";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import { loadSummarizer } from "./utils/summarizer";
// import authenticateToken, {
//   AuthorizedRequest,
// } from "./middleware/auth.middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.1.120:5173",
      "http://192.168.1.120:3000",
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("<h1>Welcome to Notely API</h1>");
});

// app.get("/authenticated", authenticateToken, (req: AuthorizedRequest, res: Response) => {
//     console.log(req.user)
//     res.send("<h1>Welcome to Authrozied Req</h1>");
// });

//Auth Views
app.use("/api/auth", authRouter);

//User Views
app.use("/api/user", userRouter);

//Entry Views
app.use("/api/entries", entryRouter);

app.use(errorHandler);
const PORT = process.env.PORT || 4321;

loadSummarizer().catch((err) => {
  console.error("Failed to load summarizer on startup", err);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
