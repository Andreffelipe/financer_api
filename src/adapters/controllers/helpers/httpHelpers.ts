import { ServerError } from '../../../utils/error/error';
import { HttpResponse } from './http';


export const badRequest = (error: string): HttpResponse => ({
  statusCode: 400,
  body: error
});
export const unauthorized = (error: string): HttpResponse => ({
  statusCode: 401,
  body: error
});
export const ok = (data: unknown): HttpResponse => ({
  statusCode: 200,
  body: data
});

export const serverError = (reason: string): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(reason)
});
