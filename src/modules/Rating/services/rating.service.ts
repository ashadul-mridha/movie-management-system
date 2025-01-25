import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRequest } from '../../../common/dtos/user-req.dto';
import { throwError } from '../../../common/errors/errors.function';
import { Movie } from '../../Movie/entities/movie.entity';
import { CreateRatingDto } from '../dtos/create-rating.dto';
import { UpdateRatingDto } from '../dtos/update-rating.dto';
import { Rating } from '../entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  select = {
    id: true,
    movieId: true,
    userId: true,
    ratingValue: true,
    createdAt: true,
    updatedAt: true,
  };

  // create a new rating
  async create(userInfo: UserRequest, createRatingDto: CreateRatingDto) {
    // check is user already rated the movie
    // const isRated = await this.ratingRepository.findOne({
    //   where: { userId: userInfo.userId, movieId: createRatingDto.movieId },
    // });

    // check movie exists
    const movie = await this.movieRepository.findOne({
      where: { id: createRatingDto.movieId },
    });

    // if movie not found throw error
    if (!movie) {
      throwError(HttpStatus.NOT_FOUND, [], 'Movie not found');
    }

    // check rating is between 1 to 5
    if (createRatingDto.ratingValue < 1 || createRatingDto.ratingValue > 5) {
      throwError(HttpStatus.BAD_REQUEST, [], 'Rating should be between 1 to 5');
    }

    // create rating
    const rating = await this.ratingRepository.save({
      ...createRatingDto,
      userId: userInfo.userId,
    });

    // if rating not created throw error
    if (!rating) {
      throwError(HttpStatus.INTERNAL_SERVER_ERROR, [], 'Rating not created');
    }

    // calculate average rating
    const avgRating = await this.calculateAverageRating(
      createRatingDto.movieId,
    );

    // update movie average rating and total rating
    await this.movieRepository
      .createQueryBuilder('movie')
      .update()
      .set({
        avgRating: +avgRating,
        totalRatings: movie.totalRatings + 1,
      })
      .where('id = :id', { id: createRatingDto.movieId })
      .execute();

    return await this.ratingRepository.findOne({ where: { id: rating.id } });
  }

  // update a rating
  async update(
    userInfo: UserRequest,
    id: number,
    updateRatingDto: UpdateRatingDto,
  ) {
    // check rating exists
    const rating = await this.ratingRepository.findOne({
      where: { id: id },
    });
    if (!rating) {
      throwError(HttpStatus.NOT_FOUND, [], 'Rating not found');
    }

    // check movie created by the same user
    if (rating.userId !== userInfo.userId) {
      throwError(
        HttpStatus.FORBIDDEN,
        [],
        'You are not allowed to update this rating',
      );
    }

    // check rating is between 1 to 5
    if (updateRatingDto.ratingValue < 1 || updateRatingDto.ratingValue > 5) {
      throwError(HttpStatus.BAD_REQUEST, [], 'Rating should be between 1 to 5');
    }

    // update rating
    const updateMovie = await this.ratingRepository.update(id, {
      ratingValue: updateRatingDto.ratingValue,
    });

    // is movie not updated throw error
    if (!updateMovie.affected) {
      throwError(HttpStatus.INTERNAL_SERVER_ERROR, [], 'Movie not updated');
    }

    // calculate average rating
    const avgRating = await this.calculateAverageRating(rating.movieId);

    // update movie average rating and total rating
    await this.movieRepository
      .createQueryBuilder('movie')
      .update()
      .set({
        avgRating: +avgRating,
      })
      .where('id = :id', { id: rating.movieId })
      .execute();

    return await this.ratingRepository.findOne({ where: { id: id } });
  }

  // view all ratings
  async allRating(
    userInfo: UserRequest,
    perPage: number = 10,
    currentPage: number = 0,
  ) {
    // get all ratings
    const [ratings, total] = await this.ratingRepository.findAndCount({
      select: this.select,
      relations: ['movie'],
      order: { id: 'DESC' },
      take: perPage,
      skip: currentPage * perPage,
    });

    // if no rating found
    if (!ratings.length) {
      throwError(HttpStatus.NOT_FOUND, [], 'No movie found');
    }

    return {
      data: ratings,
      perPage: perPage,
      currentPage: currentPage + 1,
      totalPage: Math.ceil(total / perPage),
      totalResult: total,
    };
  }

  // calculate average rating
  async calculateAverageRating(movieId: number) {
    // get all ratings of a movie
    const ratings = await this.ratingRepository.find({
      where: { movieId: movieId },
      select: ['ratingValue'],
    });

    // if no rating found
    if (!ratings.length) {
      return 0;
    }

    // calculate average rating
    const totalRating = ratings.reduce(
      (acc, rating) => acc + rating.ratingValue,
      0,
    );
    const avgRating = (totalRating / ratings.length).toFixed(2);
    return avgRating;
  }
}
