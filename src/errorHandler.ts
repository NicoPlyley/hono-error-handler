import { Context, ErrorHandler } from 'hono';
import { Error, FormattedError, ResponseHandler }  from './index';

const defaultResponseHandler: ResponseHandler = (error, c) => {
  return c.json({
    success: false,
    message: error.message
  },
    error.statusCode
  )
}

const errorHandler = (errorHandlers: Function[], customHandler: ResponseHandler = defaultResponseHandler): ErrorHandler => {
  return (err: Error, c) => {
    let error: Error = err;

    if (Array.isArray(errorHandlers) && errorHandlers.length > 0) {
      if (!error.message || !error.statusCode && error) {
        for (const handleError of errorHandlers) {
          error = handleError(error);

          if (error.statusCode) {
            break;
          }
        }
      }
    }

    return customHandler(error as FormattedError, c);
  };
};

export default errorHandler;
