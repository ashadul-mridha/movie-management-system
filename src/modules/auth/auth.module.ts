import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { AuthConfigModule } from '../../config/auth/config.module';
import { AuthConfigService } from '../../config/auth/config.service';
import { UserModule } from '../User/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      inject: [AuthConfigService],
      useFactory: async (authConfigService: AuthConfigService) => ({
        secret: authConfigService.secretKey,
        signOptions: { expiresIn: '30d' },
      }),
    } as JwtModuleAsyncOptions),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
