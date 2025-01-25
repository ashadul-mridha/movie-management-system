import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { UserTypes } from '../../../common/decorators/user-type.decorator';
import { GetUser } from '../../../common/decorators/user.decorator';
import { QueryDto } from '../../../common/dtos/query.dto';
import { UserRequest } from '../../../common/dtos/user-req.dto';
import { UserType } from '../../../common/enums/user.enums';
import { throwError } from '../../../common/errors/errors.function';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UserTypeGuard } from '../../../common/guards/user-type.guard';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { MovieService } from '../services/movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // create a new movie
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

  // update a movie
  @Patch(':id')
  @Version('1')
  @UserTypes(UserType.USER)
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  async update(
    @GetUser() userInfo: UserRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    try {
      return await this.movieService.update(userInfo, id, updateMovieDto);
    } catch (error) {
      throwError(error.status, [], error.message);
    }
  }

  // get all movies
  @Get()
  @Version('1')
  @UserTypes(UserType.USER)
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  async allMovies(@GetUser() userInfo: UserRequest, @Query() query: QueryDto) {
    try {
      return await this.movieService.allMovies(
        userInfo,
        query.perPage && +query.perPage,
        query.currentPage && query.currentPage - 1,
      );
    } catch (error) {
      throwError(error.status, [], error.message);
    }
  }

  // view user own movies
  @Get('my-movies')
  @Version('1')
  @UserTypes(UserType.USER)
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  async myMovies(@GetUser() userInfo: UserRequest) {
    try {
      return await this.movieService.myMovies(userInfo);
    } catch (error) {
      throwError(error.status, [], error.message);
    }
  }

  // get a movie by id
  @Get(':id')
  @Version('1')
  @UserTypes(UserType.USER)
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  async getMovieById(
    @GetUser() userInfo: UserRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      return await this.movieService.getMovieById(userInfo, id);
    } catch (error) {
      throwError(error.status, [], error.message);
    }
  }
}
