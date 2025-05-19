export default (err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    name: err.name,
    statusCode: err.statusCode,
    status: err.status,
  });

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Internal Server Error';

  res.status(err.statusCode).json({
    success: typeof err.success === 'boolean' ? err.success : false,
    status: err.status,
    statusCode: err.statusCode,
    message: err.message || 'Internal Server Error',

    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
