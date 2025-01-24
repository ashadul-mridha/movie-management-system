import { Body, Controller, Post, Req, Version } from '@nestjs/common';
import { throwError } from '../../../common/errors/errors.function';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // register a regular user
  @Post('register')
  @Version('1')
  async registerUser(
    @Req() req: Express.Request,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      return await this.authService.registerUser(createUserDto);
    } catch (error) {
      throwError(error.status, [], error.message);
    }
  }
  // login a regular user
  // register an admin user
  // login an admin user
}
