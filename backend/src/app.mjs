import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db/db.mjs';
import artistRouter from './routes/artistRoutes.mjs';

dotenv.config();

const app = express();

app.use(express.json());

connectDb();

app.use('/api/v1/artists', artistRouter);

export { app };
