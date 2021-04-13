import { DatabaseError } from './databaseError';

export class DatabaseInternalError extends Error implements DatabaseError {
  constructor(message: string) {
    super('Error: internal database error ' + message);
    this.name = 'DatabaseInternalError';
  }
}
