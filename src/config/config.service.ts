import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
export class ConfigService implements TypeOrmOptionsFactory {
  private envData: any;
  private environment: string;

  constructor() {
    this.environment = process.env.NODE_ENV || 'development';
    this.envData = dotenv.parse(fs.readFileSync(`${this.environment}.env`));
  }

  get(key: string, throwOnMissing = true): any {
    const value = this.envData[key];
    if (!value && throwOnMissing) {
      throw new Error(`Config error - missing env.${key}`);
    }
    return value;
  }

  isDev(): boolean {
    return this.environment === 'development';
  }

  isProd(): boolean {
    return this.environment === 'production';
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.get(k, true));
    return this;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.get('DB_TYPE'),
      host: this.get('DB_HOST'),
      port: parseInt(this.get('DB_PORT')),
      username: this.get('DB_USER'),
      password: this.get('DB_PASSWORD'),
      database: this.get('DB_NAME'),
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: ['dist/**/migrations/**/*.{ts,js}'],
      synchronize: false,
      logging: true,
      extra: {
        trustServerCertificate: true,
        cli: {
          migrationsDir: 'src/migrations',
          entitiesDir: '../src',
        },
      },
      options: {
        encrypt: true,
      },
    };
  }
}

const configService = new ConfigService().ensureValues([
  'DB_TYPE',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
]);

export { configService };
