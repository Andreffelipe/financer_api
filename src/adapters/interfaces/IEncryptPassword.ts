import { DomainError } from '../../utils/error/error';
import { Either } from '../../utils/shared/monad';

export interface IEncryptPassword {
  encrypt(id: string): Promise<Either<DomainError, string>>
  decrypt(pass: string, hash: string): Promise<Either<DomainError, boolean>>
}
