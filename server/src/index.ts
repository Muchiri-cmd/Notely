import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("<h1>Welcome to Notely API</h1>");
});

//Auth Views
app.use("/api/auth", authRouter);

app.use(errorHandler);
const PORT = process.env.PORT || 4321;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
