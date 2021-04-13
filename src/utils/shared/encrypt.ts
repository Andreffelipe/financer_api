/* eslint-disable @typescript-eslint/ban-types */
import * as argon2 from 'argon2';
import { Either, left, right } from '../shared/monad';
import { PasswordParamsError } from '../error/password_params_error';
import { IEncryptPassword } from '../../adapters/interfaces/IEncryptPassword';
import { randomBytes } from 'crypto';
import { DomainError, MissingParamsError, ServerError } from '../error/error';


export class EncryptPassword implements IEncryptPassword {

  async encrypt(password: string): Promise<Either<DomainError, string>> {
    try {
      if (!password) {
        return left(new MissingParamsError('mandatory parameters not informed'));
      }
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(password, { salt });
      return right(hashedPassword);
    } catch (error) {
      return left(new ServerError(error));
    }
  }

  async decrypt(hash: string, pass: string): Promise<Either<DomainError, boolean>> {
    try {
      if (!pass) {
        return left(new MissingParamsError('password'));
      }
      if (!hash) {
        return left(new MissingParamsError('hash'));
      }
      const result = await argon2.verify(hash, pass);
      if (!result) {
        return left(new PasswordParamsError(pass));
      }
      return right(result);
    } catch (error) {
      return left(new ServerError(error));
    }
  }
}
