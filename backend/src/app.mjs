import connectDb from './db/db.mjs';

dotenv.config({ path: './config/settings.env' });

connectDb();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  // TODO - implement logger
  //
  // app.use(logger);
}

// TODO - Implement bookingRouter
// app.use('api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  // TODO - Implement AppError
  //
  // next(
  //   new AppError(
  //     `Error 404 - Not Found. Expected: http://localhost:${process.env.PORT}/api/v1/bookings Got: ${req.originalUrl}`
  //   ),
  //   404
  // );
});

// TODO - Implement errorHandler
// app.use(errorHandler);

export { app };
