import { IsEnum, IsOptional } from 'class-validator';
import { QueryDto } from '../../../common/dtos/query.dto';
import { ReportType } from '../../../common/enums/report.enum';

export class QueryReportDto extends QueryDto {
  @IsOptional()
  @IsEnum(ReportType)
  status?: ReportType;
}
