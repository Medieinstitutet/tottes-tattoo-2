import dotenv from 'dotenv';
dotenv.config({ path: './config/settings.env' });

import express from 'express';
import bookingRouter from './routes/booking-routes.mjs';
import scheduleRouter from './routes/schedule-routes.mjs';
import artistRouter from './routes/artistRoutes.mjs';
import AppError from './models/appError.mjs';
import connectDb from './db/db.mjs';
import { logger } from './middleware/logger.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import cors from 'cors';

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // zoher added 

if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/schedule', scheduleRouter);
app.use('/api/v1/artists', artistRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Not Found. Got: http://localhost:${process.env.PORT}${req.originalUrl}`,
      404
    )
  );
});

app.use(errorHandler);

export { app };
