import { Context } from 'hono';

export { default as errorHandler } from './errorHandler';
export { default as ErrorResponse } from './errorReponse';

export interface Error {
  statusCode?: number;
  stack?: string;
  message: string;
  [key: string]: any;
}

export interface FormattedError extends Error {
  statusCode: number
}

export type ResponseHandler = (error: FormattedError, c: Context) => Response;
