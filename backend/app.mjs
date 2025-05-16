import express from 'express';
import bookingRoutes from './routes/bookingRoutes.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/bookings', bookingRoutes);
app.use(errorHandler); // Alltid sista

export default app;
