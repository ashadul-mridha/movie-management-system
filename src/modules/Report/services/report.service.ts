import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRequest } from '../../../common/dtos/user-req.dto';
import { ReportType } from '../../../common/enums/report.enum';
import { throwError } from '../../../common/errors/errors.function';
import { Movie } from '../../Movie/entities/movie.entity';
import { CreateReportDto } from '../dtos/create-report-movie.dto';
import { UpdateReportByAdminDto } from '../dtos/update-report.dto';
import { Report } from '../entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  select = {
    id: true,
  };

  // create a new report
  async create(userInfo: UserRequest, createReportDto: CreateReportDto) {
    // check the movie is exits or not
    const movie = await this.movieRepository.findOne({
      where: { id: createReportDto.movieId },
    });

    // if movie not found throw error
    if (!movie) {
      throwError(HttpStatus.NOT_FOUND, [], 'Movie not found');
    }

    return await this.reportRepository.save({
      ...createReportDto,
      reportedBy: userInfo.userId,
      status: ReportType.PENDING,
    });
  }

  // update a report
  async update(
    userInfo: UserRequest,
    id: number,
    updateReportByAdminDto: UpdateReportByAdminDto,
  ) {
    // check report exists
    const report = await this.reportRepository.findOne({
      where: { id: id },
    });
    if (!report) {
      throwError(HttpStatus.NOT_FOUND, [], 'Report not found');
    }

    // check report status already updated
    if (report.status !== ReportType.PENDING) {
      throwError(HttpStatus.BAD_REQUEST, [], 'Report already updated by admin');
    }

    // update report
    const updateReport = await this.reportRepository.update(id, {
      status: updateReportByAdminDto.status,
    });

    // is movie not updated throw error
    if (!updateReport.affected) {
      throwError(HttpStatus.INTERNAL_SERVER_ERROR, [], 'Report not updated');
    }

    return await this.reportRepository.findOne({ where: { id: id } });
  }

  // view all movies
  async findAll(
    userInfo: UserRequest,
    perPage: number = 10,
    currentPage: number = 0,
    status: ReportType,
  ) {
    // where condition
    let whereCondition = `report.deletedAt IS NULL`;
    if (status) {
      whereCondition += ` AND report.status = '${status}'`;
    }
    // get all report
    const [reports, total] = await this.reportRepository
      .createQueryBuilder('report')
      .where(whereCondition)
      .take(perPage)
      .skip(currentPage * perPage)
      .getManyAndCount();

    // if no movie found
    if (!reports.length) {
      throwError(HttpStatus.NOT_FOUND, [], 'No report found');
    }

    return {
      data: reports,
      perPage: perPage,
      currentPage: currentPage + 1,
      totalPage: Math.ceil(total / perPage),
      totalResult: total,
    };
  }
}
