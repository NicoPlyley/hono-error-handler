import { ErrorHandler } from 'hono';
import { ResponseHandler } from './index';
declare const errorHandler: (errorHandlers: Function[], customHandler?: ResponseHandler) => ErrorHandler;
export default errorHandler;
