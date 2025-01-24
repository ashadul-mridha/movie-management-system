import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthWithPort(): string {
    return 'Movie Management API Running  on port 3010';
  }
}
