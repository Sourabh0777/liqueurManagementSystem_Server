import express, { Express, NextFunction, Request, Response } from 'express';
import { PORT, environment } from './secrets';
import rootRouter from './root.routes';
import {
  ApiError,
  ErrorType,
  InternalError,
  NotFoundError,
} from './core/ApiError';

console.log(new Date());

const app: Express = express();
app.use(express.json());

app.use('/api', rootRouter);

// app.use((req: Request, res: Response, next) => next(new NotFoundError()));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('🚀 ~ app.use ~ err:', err);
  if (err instanceof ApiError) {
    return ApiError.handle(err, res);
  } else {
    if (environment === 'development') {
      return res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
});
app.listen(PORT, () => {
  console.log('Listening To port PORT');
});
