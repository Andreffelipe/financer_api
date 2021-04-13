import path from 'path';
import dotenvSafe from 'dotenv-safe';

// Load environment configuration
dotenvSafe.config({
  path: path.resolve(__dirname, '..', '..', '.env'),
  example: path.resolve(__dirname, '..', '..', '.env.example')
});

const { SECRET, DATABASE_URL, PORT, REDIS_HOST, REDIS_PORT, REDIS_PASS, DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_DIALECT, DB_PORT } = <{ [key: string]: string }>process.env;


export const configApp = {
  SECRET: SECRET,
  URL: DATABASE_URL,
  PORT,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASS,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_DIALECT,
  DB_PORT
};
