import express from 'express';
<<<<<<< HEAD
import bookingRoutes from './routes/bookingRoutes.mjs';
import artistRouter from './routes/artistRoutes.mjs';
=======
import dotenv from 'dotenv';
import bookingRouter from './routes/booking-routes.mjs';
import AppError from './models/appError.mjs';
import connectDb from './db/db.mjs';
import { logger } from './middleware/logger.mjs';
>>>>>>> booking-page
import errorHandler from './middleware/errorHandler.mjs';
import cors from 'cors';
dotenv.config({ path: './src/config/config.env' });

connectDb();

const app = express();

app.use(cors());
<<<<<<< HEAD

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static('uploads'));

// API routes
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/artists', artistRouter);

// Error handling
app.use(errorHandler);
=======
app.use(express.json());
>>>>>>> booking-page

if (process.env.NODE_ENV === 'development') {
	app.use(logger);
}

app.use('/api/v1/bookings', bookingRouter);

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
