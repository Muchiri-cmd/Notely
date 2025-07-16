import express from "express";
import { Request,Response } from "express";
import dotenv from "dotenv"

dotenv.config()

const app = express();
app.use(express.json());

app.get("/", (_req:Request,res:Response) => {
    res.send("<h1>Welcome to Notely API</h1>")
})


const PORT  = process.env.PORT || 4321

app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`)
})