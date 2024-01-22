import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes/index.routes";

const app: Express = express();
app.use("/api", rootRouter);
app.listen(PORT, () => {
  console.log("Listening To port PORT");
});
