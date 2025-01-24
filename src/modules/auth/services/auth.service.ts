import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { throwError } from '../../../common/errors/errors.function';
import { AdminService } from '../../User/services/admin.service';
import { UserService } from '../../User/services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { IUser } from '../types/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
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

  // register an admin user
  async registerAdmin(createUserDto: CreateUserDto) {
    const createUser = await this.adminService.createUser(createUserDto);

    return this.loginWithToken(createUser);
  }

  // login a admin user
  async loginAdmin(loginUserDto: LoginUserDto) {
    const checkUser = await this.adminService.loginUser(loginUserDto);

    // if user find return user with access token
    if (!checkUser) {
      throwError(HttpStatus.NOT_FOUND, [], 'User Not Found');
    }

    return this.loginWithToken(checkUser);
  }

  // send user info with token
  loginWithToken(user: IUser) {
    const userLoginInfo = {
      id: user.id,
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

  // validate user token
  async validateUser(payload: any) {
    try {
      // find user by id
      const user = await this.userService.findUserById(payload.id);
      if (user) {
        return {
          userId: payload.id,
          username: payload.userName,
          email: payload.email,
          name: payload.name,
          role: payload.role,
        };
      }
    } catch (error) {
      throwError(HttpStatus.UNAUTHORIZED, [], 'Invalid JWT token');
    }
  }
}
