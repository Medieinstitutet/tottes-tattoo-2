import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bookingRoutes from './routes/bookingRoutes.mjs';
import artistRouter from './routes/artistRoutes.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import { connectDb } from './db/db.mjs';
import cors from 'cors';

const app = express();

connectDb();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('./uploads'));

app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/artists', artistRouter);

app.use(errorHandler);

export default app;
