<<<<<<< HEAD
import express, { Express, NextFunction, Request, Response } from 'express';
import { PORT, environment } from './secrets';
import rootRouter from './root.routes';
import {
  ApiError,
  ErrorType,
  InternalError,
  NotFoundError,
} from './core/ApiError';
<<<<<<< HEAD
=======
import express, { Express, NextFunction, Request, Response } from "express";
import { PORT, environment } from "./secrets";
import rootRouter from "./root.routes";
import { ApiError, ErrorType, InternalError, NotFoundError } from "./core/ApiError";
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
=======
import cookieParser from 'cookie-parser';
>>>>>>> b77e216d91bd6c1328849815beb9469289ee93a3

console.log(new Date());

const app: Express = express();
app.use(express.json());
app.use(cookieParser());

<<<<<<< HEAD
app.use('/api', rootRouter);
// app.use((req: Request, res: Response, next) => next(new NotFoundError()));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('🚀 ~ app.use ~ err:', err);
  if (err instanceof ApiError) {
    return ApiError.handle(err, res);
  } else {
    if (environment === 'development') {
=======
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
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
      return res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
});
app.listen(PORT, () => {
<<<<<<< HEAD
  console.log('Listening To port PORT');
=======
  console.log("Listening To port PORT");
>>>>>>> fb715ff890ecbb60371a757fa2caca044a6d4187
});
