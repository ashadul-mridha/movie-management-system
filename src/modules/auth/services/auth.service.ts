import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../User/services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
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
