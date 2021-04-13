import { getConnection } from 'typeorm';

import { IUserRepository } from '../../../adapters/interfaces/IUserRepository';
import { IUserType } from '../models/IUserModel';
import { User } from '../../../domain/entities/user_entitie';
import { Either, left, right } from '../../../utils/shared/monad';
import { DatabaseError } from '../../../utils/error/databaseError/databaseError';
import { DatabaseInternalError } from '../../../utils/error/databaseError/database_internal_error';
import { UserNotFoundError } from '../../../utils/error/databaseError/UserNotFoundError';
import { UserModel } from '../../orm/typeorm/entity/User';


export class TypeormDatabaseUserImplementation implements IUserRepository {

  async save(user: IUserType): Promise<Either<DatabaseError, null | IUserType>> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(UserModel)
        .values([
          { id: user.id, firstName: user.firstName, email: user.email, password: user.password },
        ])
        .execute();
      return right(null);
    } catch (error) {
      return left(new DatabaseInternalError(error.message));
    }
  }
  async findByEmail(email: string): Promise<Either<DatabaseError, IUserType>> {
    try {
      const user = await getConnection()
        .createQueryBuilder()
        .select('user')
        .from(UserModel, 'user')
        .where('user.email = :email', { email })
        .getOne();
      return right(new User({ firstName: user!.firstName, email: user!.email, password: user!.password }));
    } catch (error) {
      return left(new UserNotFoundError());
    }
  }
  async update(user: IUserType): Promise<Either<DatabaseError, null | IUserType>> {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ firstName: user.firstName, email: user.email, password: user.password })
        .where('email = :email', { email: user.email })
        .execute();
      return right(null);
    } catch (error) {
      return left(new DatabaseInternalError(error.message));
    }
  }
  async remove(id: string): Promise<Either<DatabaseError, void | boolean>> {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id: id })
        .execute();
      return right(true);
    } catch (error) {
      return left(new DatabaseInternalError(error.message));
    }
  }
}
