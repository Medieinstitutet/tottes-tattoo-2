import { app } from './app.mjs';

const PORT = process.env.PORT || 3010;

app.listen(PORT, () =>
  console.log(
    `Server now running at http://localhost:${PORT} in ${process.env.NODE_ENV} mode.`
  )
);
