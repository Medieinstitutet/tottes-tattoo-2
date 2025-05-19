// the error message for when client submits a bad http post.
// These are errors in the 400 - 499 range
export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    switch (statusCode) {
      case 400:
        this.status =
          'Bad Request, missing typically due to malformed request syntax, invalid request message framing, or deceptive request routing.';
        break;
      case 403:
        this.status =
          'Forbidden. The request failure is tied to application logic, such as insufficient permissions to a resource or action.';
        break;
      case 404:
        this.status =
          'Not found. The server cannot find the requested resource';
        break;
      case statusCode && statusCode.toString().startsWith('5'):
        this.status = 'Internal server error';
        break;
      default:
        this.status = 'Unknown error.';
    }

    Error.captureStackTrace(this, this.constructor);
  }
}
