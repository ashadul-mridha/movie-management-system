import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class UpdateRatingDto {
  @ApiPropertyOptional({
    description: 'Updated rating value between 1 and 5',
    example: 5,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  ratingValue?: number;
}
