import { DomainError } from '../../utils/error/error';
import { Either } from '../../utils/shared/monad';

export interface IUserRepository {
  save(user: Financer.User): Promise<Either<DomainError, null | Financer.User>>;
  findByEmail(email: string): Promise<Either<DomainError, null | Financer.User>>;
  update(user: Financer.User): Promise<Either<DomainError, null | Financer.User>>;
  remove(id: string): Promise<Either<DomainError, void | any>>;
}
