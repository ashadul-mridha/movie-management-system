import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRequest } from '../../../common/dtos/user-req.dto';
import { throwError } from '../../../common/errors/errors.function';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  // create a new movie
  async create(userInfo: UserRequest, createMovieDto: CreateMovieDto) {
    console.log(userInfo);

    return await this.movieRepository.save({
      ...createMovieDto,
      createdBy: userInfo.id,
    });
  }

  // update a movie
  async update(
    userInfo: UserRequest,
    id: number,
    updateMovieDto: UpdateMovieDto,
  ) {
    // check movie exists
    const movie = await this.movieRepository.findOne({
      where: { id: id },
    });
    if (!movie) {
      throwError(HttpStatus.NOT_FOUND, [], 'Movie not found');
    }

    // check movie created by the same user
    if (movie.createdBy !== userInfo.id) {
      throwError(
        HttpStatus.FORBIDDEN,
        [],
        'You are not allowed to update this movie',
      );
    }

    // update movie
    const updateMovie = await this.movieRepository.update(id, {
      ...updateMovieDto,
      updatedAt: new Date(),
    });

    // is movie not updated throw error
    if (!updateMovie.affected) {
      throwError(HttpStatus.INTERNAL_SERVER_ERROR, [], 'Movie not updated');
    }

    return await this.movieRepository.findOne({ where: { id: id } });
  }
}
