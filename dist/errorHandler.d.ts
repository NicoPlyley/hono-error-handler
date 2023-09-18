import { ErrorHandler } from 'hono';
declare const errorHandler: (errorHandlers: Function[], printStack?: boolean) => ErrorHandler;
export default errorHandler;
