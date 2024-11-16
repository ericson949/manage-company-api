import { registerAs } from '@nestjs/config';
import * as fs from 'fs';

export const databaseConfig = registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DATABASE_URL,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME, 
  entities: ['dist/**/*.entity{.ts,.js}'],
  ssl: {
    ca: fs.readFileSync(process.env.DATABASE_SSL).toString(),
  },
  extra: {
    ssl: {
      // Disregard mismatch between localhost and rds.amazonaws.com
      rejectUnauthorized: false,
    },
  },
  synchronize:true,
//   synchronize: process.env.NODE_ENV !== 'production',
}));
