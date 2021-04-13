// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export const development = {
  username: 'root',
  password: '123456',
  database: 'financer',
  host: '127.0.0.1',
  dialect: 'mysql'
};
export const test = {
  username: 'root',
  password: null,
  database: 'database_test',
  host: '127.0.0.1',
  dialect: 'mysql'
};
export const production = {
  username: 'root',
  password: null,
  database: 'database_production',
  host: '127.0.0.1',
  dialect: 'mysql'
};
