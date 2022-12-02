import { join } from 'path';
import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'juanri',
  password: '1234',
  database: 'somehealthchecker',
  logging: true,
  synchronize: false,
  name: 'default',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
});

// eslint-disable-next-line prettier/prettier
connectionSource.initialize();