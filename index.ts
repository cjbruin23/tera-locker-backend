import express, { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import ErrorHandler from "./middleware/ErrorHandler";
import MulterRequest from "./types/MulterRequest";
import multer from "multer";

const cors = require("cors");
const upload = multer({ dest: "uploads/" });

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

app.post("/file", upload.single("file"), (req: Request, res: Response) => {
  // Need to delete the file after from disk after uploading it to cloud
  try {
    console.log("req file", (req as MulterRequest).file);
    res.send("This was a success");
  } catch (err) {
    console.log("err", err);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
