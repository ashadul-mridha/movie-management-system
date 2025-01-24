import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { throwError } from '../../../common/errors/errors.function';
import { AuthConfigService } from '../../../config/auth/config.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authConfigService: AuthConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRETKEY,
      passReqToCallback: true,
    });
  }

  // need to implement validate method because we are extending PassportStrategy
  async validate(req: Request, payload: any) {
    try {
      const user = this.authService.validateUser(payload);
      if (!user) {
        throwError(HttpStatus.UNAUTHORIZED, [], 'Invalid JWT token');
      }
      return {
        userId: payload.id,
        username: payload.userName,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      };
    } catch (error) {
      throwError(HttpStatus.UNAUTHORIZED, [], 'Invalid JWT token');
    }
  }
}
