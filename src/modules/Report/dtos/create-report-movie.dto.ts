import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({
    description: 'ID of the movie being reported',
    example: 123,
  })
  @IsInt()
  @IsNotEmpty()
  movieId: number;

  @ApiProperty({
    description: 'Reason for reporting the movie',
    example: 'Inappropriate content',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
