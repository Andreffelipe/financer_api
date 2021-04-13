import { DatabaseError } from './databaseError';

export class UserNotFoundError extends Error implements DatabaseError {
  constructor() {
    super('Error: user not found');
    this.name = 'UserNotFoundError';
  }

}
