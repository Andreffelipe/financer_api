/* eslint-disable @typescript-eslint/ban-types */
import { Either, left, right } from '../shared/monad';
import { sign, verify } from 'jsonwebtoken';
import { configApp } from '../../config/config';
import { ITokenGenerator } from '../../adapters/interfaces/ITokenGenerator';
import { DomainError, MissingParamsError, ServerError, TokenInvalidError } from '../error/error';

export class TokenGenerator implements ITokenGenerator {

  async generator(id: string): Promise<Either<DomainError, string>> {
    try {
      if (!id) {
        return left(new MissingParamsError('id'));
      }
      return right(sign({ _id: id }, configApp.SECRET, { expiresIn: '1h' }));
    } catch (error) {
      return left(new ServerError(error));
    }
  }
  async decoded(token: string): Promise<Either<DomainError, string | boolean>> {
    try {
      if (!token) {
        return left(new MissingParamsError('token does not existes'));
      }
      const result = verify(token, configApp.SECRET);
      if (!result) {
        return left(new TokenInvalidError('token is invalid'));
      }
      return right(result.toString());
    } catch (error) {
      return left(new ServerError(error));
    }
  }
}
