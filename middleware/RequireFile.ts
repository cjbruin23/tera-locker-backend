import { NextFunction, Request, Response } from "express";
import MulterRequest from "../types/MulterRequest";

const RequireFile = (req: Request, res: Response, next: NextFunction) => {
  console.log("require file");
  const uploadedFile = (req as MulterRequest).file;
  if (!uploadedFile) {
    res.status(400).send("Must include file with request");
  } else {
    next();
  }
};

export default RequireFile;
