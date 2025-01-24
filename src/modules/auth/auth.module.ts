import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { AuthConfigModule } from '../../config/auth/config.module';
import { AuthConfigService } from '../../config/auth/config.service';
import { UserModule } from '../User/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/jwt.strategy';

@Module({
  imports: [
    UserModule,
    AuthConfigModule,
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
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
