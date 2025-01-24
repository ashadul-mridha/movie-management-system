import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MysqlConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().default('mysql'),
        MYSQL_PORT: Joi.number().default(3306),
        MYSQL_ROOT_USER: Joi.string().default('root'),
        MYSQL_ROOT_PASSWORD: Joi.string().default('password'),
        MYSQL_DATABASE: Joi.string().default('movie_management'),
      }),
    }),
  ],
  providers: [ConfigService, MysqlConfigService],
  exports: [ConfigService, MysqlConfigService],
})
export class MysqlConfigModule {}
