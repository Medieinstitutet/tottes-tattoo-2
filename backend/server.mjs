<<<<<<< HEAD
import dotenv from 'dotenv';
dotenv.config();

import app from './app.mjs';
=======
import { app } from './app.mjs';
>>>>>>> booking-page

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} (${process.env.NODE_ENV})`);
});
