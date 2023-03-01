import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env["PORT"];

app.get("/", (req: Request, res: Response) => {
  console.log("req", req);
  res.send("Express + TypeScript Server");
});

app.get("files/", (req: Request, res: Response) => {
  console.log("get files", req);
  res.send("You do have access to this resource");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
