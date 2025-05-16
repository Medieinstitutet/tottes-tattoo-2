import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db/db.mjs';

dotenv.config();

const app = express();

app.use(express.json());

connectDb();

export { app };
