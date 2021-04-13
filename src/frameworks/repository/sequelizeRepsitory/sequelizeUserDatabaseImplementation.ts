import { IUserRepository } from '../../../adapters/interfaces/IUserRepository';
import { DatabaseInternalError } from '../../../utils/error/databaseError/database_internal_error';
import { DomainError } from '../../../utils/error/error';
import { Either, left, right } from '../../../utils/shared/monad';
import User from '../../orm/sequelize/models/user';
import { IUserType } from '../models/IUserModel';

export class SequelizeUserDatabaseImplementation implements IUserRepository {

  async save(user: IUserType): Promise<Either<DomainError, IUserType>> {
    console.log(user);
    try {
      const seqUser = await User.create({ id: user.id, firstName: user.firstName, email: user.email, password: user.password });
      await seqUser.save();
      return right(seqUser);
    } catch (error) {
      return left(new DatabaseInternalError(error.message));
    }
  }

  async update(user: IUserType): Promise<Either<DomainError, null | IUserType>> {
    try {
      const seqUser = await User.findOne({ where: { email: user.email } });
      if (!seqUser) return right(null);
      const { firstName, email, password } = user;
      await seqUser.update({ firstName, email, password });
      return right(seqUser);
    } catch (error) {
      return left(new DatabaseInternalError(error.message));
    }
  }

  async remove(id: string): Promise<Either<DomainError, void | any>> {
    try {
      const seqUser = await User.findByPk(id);
      if (seqUser) {
        return right(await seqUser.destroy());
      }
      return right(false);
    } catch (error) {
      return left(new DatabaseInternalError(error.message));
    }
  }

  async findByEmail(email: string): Promise<Either<DomainError, IUserType | null>> {
    try {
      const seqUser = await User.findOne({ where: { email } });
      if (seqUser) {
        return right(seqUser);
      }
      return right(null);
    } catch (error) {
      return left(new DatabaseInternalError(error.message));
    }
  }
}
