import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ReportType } from '../../../common/enums/report.enum';

export class UpdateReportByAdminDto {
  @ApiPropertyOptional({
    description: 'Status of the report',
    example: 'approved',
  })
  @IsNotEmpty()
  @IsEnum(ReportType, {
    message: 'Status must be one of: pending, approved, or rejected',
  })
  status: ReportType;
}
