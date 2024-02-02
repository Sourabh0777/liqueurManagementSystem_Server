import express, { Express, NextFunction, Request, Response } from "express";
import { PORT, environment } from "./secrets";
import rootRouter from "./root.routes";
import { ApiError, ErrorType, InternalError, NotFoundError } from "./core/ApiError";

console.log(new Date());

const app: Express = express();
app.use(express.json());

app.use("/api", rootRouter);

// app.use((req: Request, res: Response, next) => next(new NotFoundError()));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("error middleware triggered");

  if (err instanceof ApiError) {
    console.log("ApiError occurred:", err.type, err.message);

    return ApiError.handle(err, res);
  } else {
    console.log("Non-ApiError occurred:", err);

    if (environment === "development") {
      return res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
});
app.listen(PORT, () => {
  console.log("Listening To port PORT");
});
