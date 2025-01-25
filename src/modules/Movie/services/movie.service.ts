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

  select = {
    id: true,
    title: true,
    description: true,
    releasedAt: true,
    duration: true,
    genre: true,
    language: true,
    avgRating: true,
    totalRatings: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true,
  };

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

  // view all movies
  async allMovies(
    userInfo: UserRequest,
    perPage: number = 10,
    currentPage: number = 0,
  ) {
    // get all movies
    const [movies, total] = await this.movieRepository.findAndCount({
      where: { createdBy: userInfo.id },
      select: this.select,
      take: perPage,
      skip: currentPage * perPage,
    });

    // if no movie found
    if (!movies.length) {
      throwError(HttpStatus.NOT_FOUND, [], 'No movie found');
    }

    return {
      data: movies,
      perPage: perPage,
      currentPage: currentPage + 1,
      totalPage: Math.ceil(total / perPage),
      totalResult: total,
    };
  }

  // view user own movies
  async myMovies(userInfo: UserRequest) {
    const myMovies = await this.movieRepository.find({
      where: { createdBy: userInfo.id },
      select: this.select,
    });

    // if no movie found
    if (!myMovies.length) {
      throwError(HttpStatus.NOT_FOUND, [], 'No movie found');
    }

    return {
      data: myMovies,
      message: 'Movies found',
      status: HttpStatus.OK,
    };
  }

  // get a movie by id
  async getMovieById(userInfo: UserRequest, id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id: id },
      select: this.select,
    });

    // if no movie found
    if (!movie) {
      throwError(HttpStatus.NOT_FOUND, [], 'Movie not found');
    }

    return {
      data: movie,
      message: 'Movie found',
      status: HttpStatus.OK,
    };
  }
}
