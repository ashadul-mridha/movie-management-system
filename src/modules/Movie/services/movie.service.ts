import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRequest } from '../../../common/dtos/user-req.dto';
import { CreateMovieDto } from '../dtos/create-movie.dto';
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

    return createMovieDto;
    // const newMovie = this.userRepository.create({
    //   ...movie,
    //   createdBy,
    // });
    // await this.userRepository.save(newMovie);
    // return newMovie;
  }
}
