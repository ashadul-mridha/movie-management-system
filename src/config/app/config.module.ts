import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('Movie Management API'),
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_URL: Joi.string().default('http://127.0.0.1:3010'),
        APP_PORT: Joi.number().default(3010),
        API_VERSION: Joi.string().default('1'),
        SENTRY_DSN: Joi.string().optional().default('test'),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
