import Sequelize from 'sequelize';
import { configApp } from '../../../../config/config';
const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT
} = configApp;

class Database {
  public connection!: Sequelize.Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize.Sequelize(
      DB_NAME,
      DB_USER,
      DB_PASS,
      {
        host: DB_HOST,
        dialect: 'mysql',
        port: Number(DB_PORT),
        define: {
          timestamps: true,
        },
      });
  }
}

const database: Database = new Database();

export default database;
