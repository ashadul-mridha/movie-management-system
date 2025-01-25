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
import { UserRequest } from '../../../common/dtos/user-req.dto';
import { UserType } from '../../../common/enums/user.enums';
import { throwError } from '../../../common/errors/errors.function';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UserTypeGuard } from '../../../common/guards/user-type.guard';
import { CreateReportDto } from '../dtos/create-report-movie.dto';
import { QueryReportDto } from '../dtos/query-report.dto';
import { UpdateReportByAdminDto } from '../dtos/update-report.dto';
import { ReportService } from '../services/report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // create a new report
  @Post()
  @Version('1')
  @UserTypes(UserType.USER)
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  async create(
    @GetUser() userInfo: UserRequest,
    @Body() createReportDto: CreateReportDto,
  ) {
    try {
      return await this.reportService.create(userInfo, createReportDto);
    } catch (error) {
      throwError(error.status, [], error.message);
    }
  }

  // update a report
  @Patch(':id')
  @Version('1')
  @UserTypes(UserType.ADMIN)
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  async update(
    @GetUser() userInfo: UserRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReportByAdminDto: UpdateReportByAdminDto,
  ) {
    try {
      return await this.reportService.update(
        userInfo,
        id,
        updateReportByAdminDto,
      );
    } catch (error) {
      throwError(error.status, [], error.message);
    }
  }

  // get all reports
  @Get()
  @Version('1')
  @UserTypes(UserType.ADMIN)
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  async allMovies(
    @GetUser() userInfo: UserRequest,
    @Query() query: QueryReportDto,
  ) {
    try {
      return await this.reportService.findAll(
        userInfo,
        query.perPage && +query.perPage,
        query.currentPage && query.currentPage - 1,
        query.reportType && query.reportType,
      );
    } catch (error) {
      throwError(error.status, [], error.message);
    }
  }
}
