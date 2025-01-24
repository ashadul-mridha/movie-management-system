import { Body, Controller, Post, Req, Version } from '@nestjs/common';
import { throwError } from '../../../common/errors/errors.function';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
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
  @Post('user/login')
  @Version('1')
  async userLogin(
    @Req() req: Express.Request,
    @Body() loginUserDto: LoginUserDto,
  ) {
    try {
      return await this.authService.loginUser(loginUserDto);
    } catch (error) {
      throwError(error.status, [], error.message);
    }
  }
  // register an admin user
  // login an admin user
}
