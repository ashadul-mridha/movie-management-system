import { Body, Controller, Post, UseGuards, Version } from '@nestjs/common';
import { UserTypes } from '../../../common/decorators/user-type.decorator';
import { GetUser } from '../../../common/decorators/user.decorator';
import { UserRequest } from '../../../common/dtos/user-req.dto';
import { UserType } from '../../../common/enums/user.enums';
import { throwError } from '../../../common/errors/errors.function';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UserTypeGuard } from '../../../common/guards/user-type.guard';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { MovieService } from '../services/movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @Version('1')
  @UserTypes(UserType.USER)
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  async create(
    @GetUser() userInfo: UserRequest,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    try {
      return await this.movieService.create(userInfo, createMovieDto);
    } catch (error) {
      throwError(error.status, [], error.message);
    }
  }
}
