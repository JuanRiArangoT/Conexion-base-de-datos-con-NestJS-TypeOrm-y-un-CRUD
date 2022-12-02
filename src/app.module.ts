import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import 'reflect-metadata';
import { ConfigService, configService } from './config/config.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.createTypeOrmOptions()),
    UsersModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
