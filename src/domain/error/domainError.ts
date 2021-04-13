export interface DomainError {
  message: string
}
export class InvalidEmailError extends Error implements DomainError {
  constructor(email: string) {
    super(`The email "${email}" is invalid.`);
    this.name = 'InvalidEmailError';
  }
}
export class MissingParamsError extends Error implements DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'MissingParamsError';
  }
}

export class InvalidPasswordError extends Error implements DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPasswordError';
  }
}

export class UserNotFoundError extends Error implements DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPasswordError';
  }
}
export class UnauthorizedError extends Error implements DomainError {
  constructor() {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
  }
}
