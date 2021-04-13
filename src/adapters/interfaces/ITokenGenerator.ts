import { DomainError } from '../../utils/error/error';
import { Either } from '../../utils/shared/monad';

export interface ITokenGenerator {
  generator(id: string): Promise<Either<DomainError, string>>
  decoded(pass: string, hash: string): Promise<Either<DomainError, string | boolean>>
}
