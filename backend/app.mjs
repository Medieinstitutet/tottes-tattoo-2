import express from 'express';
import dotenv from 'dotenv';
import bookingRouter from './routes/booking-routes.mjs';
import scheduleRouter from './routes/schedule-routes.mjs';
import artistRouter from './routes/artistRoutes.mjs';
import AppError from './models/appError.mjs';
import connectDb from './db/db.mjs';
import { logger } from './middleware/logger.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

connectDb();

// För att få dirname i ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
