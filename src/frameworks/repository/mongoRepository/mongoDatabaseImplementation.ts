import { IUserRepository } from '../../../adapters/interfaces/IUserRepository';
import { IUserType } from '../models/IUserModel';
import UserModel from '../../orm/mongodb/models/user';
import { User } from '../../../domain/entities/user_entitie';
import { Either, left, right } from '../../../utils/shared/monad';
import { DatabaseError } from '../../../utils/error/databaseError/databaseError';
import { DatabaseInternalError } from '../../../utils/error/databaseError/database_internal_error';

export class MongoDatabaseImplementation implements IUserRepository {

  async save(user: IUserType): Promise<Either<DatabaseError, null>> {
    try {
      const userMongo = new UserModel({ firstName: user.firstName, email: user.email, password: user.password });
      return await userMongo.save();
    } catch (error) {
      return left(new DatabaseInternalError(error.message));
    }
  }
  async findByEmail(email: string): Promise<Either<DatabaseError, IUserType>> {
    try {
      const user: IUserType = await UserModel.findOne({ email: email });
      console.log(user);
      return right(new User({ firstName: user.firstName, email: user.email, password: user.password }));
    } catch (error) {
      return left(new DatabaseInternalError(error.message));
    }
  }
  async update(user: IUserType): Promise<Either<DatabaseError, null>> {
    try {
      return await UserModel.findByIdAndUpdate(user.id, { firstName: user.firstName, email: user.email, password: user.password });
    } catch (error) {
      return left(new DatabaseInternalError(error.message));
    }
  }
  async remove(id: string): Promise<Either<DatabaseError, void>> {
    try {
      return await UserModel.findByIdAndDelete(id);
    } catch (error) {
      return left(new DatabaseInternalError(error.message));
    }
  }
}
