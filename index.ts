import express, { Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";

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
  console.log("get files", req);
  res.send("You do have access to this resource");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
