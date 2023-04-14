import express, { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { uploadToS3 } from "./utils/s3-engine";
import dotenv from "dotenv";
import ErrorHandler from "./middleware/ErrorHandler";
import MulterRequest from "./types/MulterRequest";
import multer from "multer";
import RequireMultipartContent from "./middleware/RequireMultipart";
import RequireFile from "./middleware/RequireFile";
import compression from "compression";
import cors from "cors";
import fs from "fs";

dotenv.config();

const upload = multer({ dest: "uploads/" });
const port = process.env["PORT"];
const issuerBaseURL = `https://${process.env["AUTH0_DOMAIN"]}`;
const audience = `${process.env["AUTH0_AUDIENCE"]}`;
const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());

// Right now, protecting all routes
app.use(
  auth({
    issuerBaseURL,
    audience,
  })
);

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

app.post(
  "/file",
  upload.single("file"),
  RequireFile,
  RequireMultipartContent,
  async (req: Request, res: Response, next: NextFunction) => {
    const uploadedFile = (req as MulterRequest).file;
    const originalFileName = uploadedFile.originalname;
    const fullFilePath = `${uploadedFile.path}`;

    try {
      await uploadToS3(originalFileName, fullFilePath);
      fs.unlink(fullFilePath, () => {
        console.log("successfully deleted file");
      });
      res.send(originalFileName + " file successfully uploaded");
    } catch (err) {
      next(err);
    }
  }
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  ErrorHandler(err, req, res, next);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
