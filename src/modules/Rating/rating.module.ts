import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../Movie/entities/movie.entity';
import { RatingController } from './controllers/rating.controller';
import { Rating } from './entities/rating.entity';
import { RatingService } from './services/rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Movie])],
  controllers: [RatingController],
  providers: [RatingService],
  exports: [RatingService],
})
export class RatingModule {}
