import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import * as medium from "./integrations/medium";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", async (req: Request, res: Response) => {
  medium.testConnection();
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
