import { ErrorHandler } from 'hono';
import { CustomErrorHandler } from './index';

const errorHandler =
  (errorHandlers: Function[], printStack = true): ErrorHandler =>
    async (err, c) => {
      let error: CustomErrorHandler = err;

      if (printStack && error.stack) {
        console.error(error.stack);
      }

      if (Array.isArray(errorHandlers) && errorHandlers.length > 0) {
        if (!error.message || !error.statusCode && err) {
          for (const handleError of errorHandlers) {
            error = handleError(error);

            if (error.statusCode) {
              break;
            }
          }
        }
      }

      return c.json(
        {
          success: false,
          message: error.message || 'Internal server error',
        },
        error?.statusCode || 500,
      );
    };

export default errorHandler;
