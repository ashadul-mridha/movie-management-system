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
import { CreateRatingDto } from '../dtos/create-rating.dto';
import { UpdateRatingDto } from '../dtos/update-rating.dto';
import { RatingService } from '../services/rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  // create a new movie
  @Post()
  @Version('1')
  @UserTypes(UserType.USER)
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  async create(
    @GetUser() userInfo: UserRequest,
    @Body() createRatingDto: CreateRatingDto,
  ) {
    try {
      return await this.ratingService.create(userInfo, createRatingDto);
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
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    try {
      return await this.ratingService.update(userInfo, id, updateRatingDto);
    } catch (error) {
      throwError(error.status, [], error.message);
    }
  }

  // get all ratings
  @Get()
  @Version('1')
  @UserTypes(UserType.USER)
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  async allRating(@GetUser() userInfo: UserRequest, @Query() query: QueryDto) {
    try {
      return await this.ratingService.allRating(
        userInfo,
        query.perPage && +query.perPage,
        query.currentPage && query.currentPage - 1,
      );
    } catch (error) {
      throwError(error.status, [], error.message);
    }
  }
}
