import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import { PrismaClient } from "@prisma/client";
import rootRouter from "./root.routes";

const app: Express = express();
app.use(express.json());

app.use("/api", rootRouter);
app.listen(PORT, () => {
  console.log("Listening To port PORT");
});
