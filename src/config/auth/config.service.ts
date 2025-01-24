import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get secretKey(): string {
    return this.configService.get<string>('auth.secretKey');
  }
}
