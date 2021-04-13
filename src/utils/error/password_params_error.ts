export class PasswordParamsError extends Error {
  constructor(params: string) {
    super(`Password invalid: ${params}`);
    this.name = 'PasswordParamsError';
  }
}
