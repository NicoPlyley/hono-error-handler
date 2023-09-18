export { default as errorHandler } from './errorHandler';
export { default as ErrorResponse } from './errorReponse';

export interface CustomErrorHandler {
  statusCode?: number;
  stack?: string;
  message: string;
  [key: string]: any;
}
