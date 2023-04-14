import { NextFunction, Request, Response } from "express";
import MulterRequest from "../types/MulterRequest";

const RequireFile = (req: Request, res: Response, next: NextFunction) => {
  const acceptedMimetypes = ["text/csv", "application/json"];

  const uploadedFile = (req as MulterRequest).file;
  console.log("uplaodedFile", uploadedFile);
  if (!uploadedFile) {
    res.status(400).send("Must include file with request");
  }

  if (!acceptedMimetypes.includes(uploadedFile.mimetype)) {
    res.status(400).send("File must be of proper type: csv, txt or json");
  }
  next();
};

export default RequireFile;
