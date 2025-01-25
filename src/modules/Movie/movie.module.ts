import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from '../Rating/entities/rating.entity';
import { MovieController } from './controllers/movie.controller';
import { Movie } from './entities/movie.entity';
import { MovieService } from './services/movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Rating])],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
