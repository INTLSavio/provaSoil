import { resolve } from 'path'
import * as dotenv from "dotenv";

dotenv.config();

export = {
    client: 'postgresql',
    connection: {
      host: process.env.HOST,
      database: process.env.DATABASE,
      user:     process.env.USER,
      password: process.env.PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve(__dirname, 'src', 'database', 'migrations')
    }
}


