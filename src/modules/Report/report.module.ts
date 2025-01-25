import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../Movie/entities/movie.entity';
import { ReportController } from './controllers/report.controller';
import { Report } from './entities/report.entity';
import { ReportService } from './services/report.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Movie])],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
