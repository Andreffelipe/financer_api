import Sequelize, { Model } from 'sequelize';
import database from '../config';

class User extends Model {
  public id!: string;
  public firstName!: string;
  public password!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    firstName: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  {
    sequelize: database.connection,
    freezeTableName: true,
  }
);

export default User;
