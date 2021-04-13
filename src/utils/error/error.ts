export interface DomainError {
  message: string
}
export class ServerError extends Error implements DomainError {
  constructor(params: string) {
    super(params);
    this.name = 'ServerError';
  }
}
export class TokenInvalidError extends Error implements DomainError {
  constructor(params: string) {
    super(params);
    this.name = 'ServerError';
  }
}
export class MissingParamsError extends Error implements DomainError {
  constructor(params: string) {
    super(`Missing params: ${params}`);
    this.name = 'MissingParamsError';
  }
}
