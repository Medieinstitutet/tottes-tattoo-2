import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bookingRoutes from './routes/bookingRoutes.mjs';
import artistRouter from './routes/artistRoutes.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import { connectDb } from './db/db.mjs';
import cors from 'cors';

const app = express();

// Connect to database
connectDb();

// Security middleware
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static('./uploads'));

// API routes
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/artists', artistRouter);

// Error handling
app.use(errorHandler);

export default app;
