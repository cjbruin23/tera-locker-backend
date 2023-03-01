import { Request, Response } from "express";

const ErrorHandler = (err: Error, req: Request, res: Response) => {
  console.log("Middleware Error Hadnling", err, req);
  //   const errStatus = err || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(500).json({
    success: false,
    status: "errStatus",
    message: errMsg,
  });
};

export default ErrorHandler;
