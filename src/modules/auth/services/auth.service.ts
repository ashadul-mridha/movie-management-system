import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { throwError } from '../../../common/errors/errors.function';
import { UserService } from '../../User/services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { IUser } from '../types/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  // register a regular user
  async registerUser(createUserDto: CreateUserDto) {
    const createUser = await this.userService.createUser(createUserDto);

    return this.loginWithToken(createUser);
  }

  // login a user
  async loginUser(loginUserDto: LoginUserDto) {
    const checkUser = await this.userService.loginUser(loginUserDto);

    // if user find return user with access token
    if (!checkUser) {
      throwError(HttpStatus.NOT_FOUND, [], 'User Not Found');
    }

    return this.loginWithToken(checkUser);
  }

  // send user info with token
  loginWithToken(user: IUser) {
    const userLoginInfo = {
      userName: user.userName,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    return {
      ...userLoginInfo,
      access_token: this.jwtService.sign(userLoginInfo),
    };
  }
}
