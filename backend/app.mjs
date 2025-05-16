import express from 'express';
import dotenv from 'dotenv';
import bookingRouter from './routes/booking-routes.mjs';
import AppError from './models/appError.mjs';
import connectDb from './db/db.mjs';
import { logger } from './middleware/logger.mjs';
import errorHandler from './middleware/errorHandler.mjs';

dotenv.config({ path: './config/settings.env' });

connectDb();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

app.use('api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Error 404 - Not Found. Expected: http://localhost:${process.env.PORT}/api/v1/bookings Got: ${req.originalUrl}`
    ),
    404
  );
});

app.use(errorHandler);

export { app };
