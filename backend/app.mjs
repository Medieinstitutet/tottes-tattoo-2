import express from 'express';
import dotenv from 'dotenv';
import bookingRouter from './routes/booking-routes.mjs';
import scheduleRouter from './routes/schedule-routes.mjs';
import AppError from './models/appError.mjs';
import connectDb from './db/db.mjs';
import { logger } from './middleware/logger.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import cors from 'cors';
dotenv.config({ path: './src/config/config.env' });

connectDb();

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(logger);
}

app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/schedule', scheduleRouter);

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
