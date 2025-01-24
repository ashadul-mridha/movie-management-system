import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserType } from '../../../common/enums/user.enums';
import { throwError } from '../../../common/errors/errors.function';
import { CreateUserDto } from '../../auth/dtos/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // create a user
  async createUser(createUserDto: CreateUserDto) {
    // check userName already exists
    const checkUserName = await this.userRepository.findOne({
      where: { userName: createUserDto.userName, role: UserType.USER },
    });
    if (checkUserName) {
      throwError(400, ['userName'], 'User name already exists');
    }

    // check email already exists
    const checkEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email, role: UserType.USER },
    });
    if (checkEmail) {
      throwError(400, ['email'], 'Email already exists');
    }

    // hash password
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    // create user
    return await this.userRepository.save({
      ...createUserDto,
      role: UserType.USER,
    });
  }
}
