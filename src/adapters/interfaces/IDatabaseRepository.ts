import { DomainError } from '../../utils/error/error';
import { Either } from '../../utils/shared/monad';

export interface IDatabaseRepository<T> {
  save(user: T): Promise<Either<DomainError, null | T>>;
  find(email: string): Promise<Either<DomainError, null | T>>;
  update(user: T): Promise<Either<DomainError, null | T>>;
  remove(id: string): Promise<Either<DomainError, void | any>>;
}
