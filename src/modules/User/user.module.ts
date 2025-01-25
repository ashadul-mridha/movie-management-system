import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../Movie/entities/movie.entity';
import { AdminController } from './controllers/admin.controller';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { AdminService } from './services/admin.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Movie])],
  controllers: [UserController, AdminController],
  providers: [UserService, AdminService],
  exports: [UserService, AdminService],
})
export class UserModule {}
