import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { UserModule } from './modules/User/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.module';

@Module({
  imports: [
    AppConfigModule,
    MysqlDatabaseProviderModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
