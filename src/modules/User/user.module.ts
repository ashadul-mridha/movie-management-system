import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './controllers/admin.controller';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { AdminService } from './services/admin.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, AdminController],
  providers: [UserService, AdminService],
  exports: [UserService, AdminService],
})
export class UserModule {}
