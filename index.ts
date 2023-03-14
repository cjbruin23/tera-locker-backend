import express, { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import ErrorHandler from "./middleware/ErrorHandler";
const cors = require("cors");

dotenv.config();

const port = process.env["PORT"];
const issuerBaseURL = `https://${process.env["AUTH0_DOMAIN"]}`;
const audience = `${process.env["AUTH0_AUDIENCE"]}`;
const app = express();

app.use(cors());
// Right now, protecting all routes
app.use(
  auth({
    issuerBaseURL,
    audience,
  })
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  ErrorHandler(err, req, res, next);
});

app.get("/", (req: Request, res: Response) => {
  console.log("req", req);
  res.send("Express + TypeScript Server");
});

app.get("/files", (_, res: Response) => {
  try {
    res.send("You do have access to this resource");
  } catch (err) {
    console.log("err", err);
  }
});

app.post("/file", (req: Request, res: Response) => {
  console.log("req", req);
  res.send("This was a success");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
