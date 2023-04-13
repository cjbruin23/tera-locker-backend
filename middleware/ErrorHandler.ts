import { NextFunction, Request, Response } from "express";
import ResponseError from "../types/ResponseError";

const ErrorHandler = (
  err: ResponseError,
  // @ts-ignore
  req: Request,
  res: Response,
  // @ts-ignore
  next: NextFunction
) => {
  console.error("Middleware Error Handling", err);
  console.log("request", req.headers);
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(500).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
};

export default ErrorHandler;
