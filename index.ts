import express, { Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import ErrorHandler from "./middleware/ErrorHandler";

dotenv.config();
const port = process.env["PORT"];

const app = express();

// Right now, protecting all routes
app.use(
  auth({
    issuerBaseURL: `${process.env["AUTH0_DOMAIN"]}`,
    audience: `${process.env["AUTH0_AUDIENCE"]}`,
  })
);

app.get("/", (req: Request, res: Response) => {
  console.log("req", req);
  res.send("Express + TypeScript Server");
});

app.get("/files", (req: Request, res: Response) => {
  try {
    console.log("get files", req);
    res.send("You do have access to this resource");
  } catch (err) {
    console.log("err", err);
  }
});

app.use((err: Error, req: Request, res: Response) => {
  ErrorHandler(err, req, res);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
