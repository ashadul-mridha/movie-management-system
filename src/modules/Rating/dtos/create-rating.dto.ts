import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({
    description: 'Rating value between 1 and 5',
    example: 4,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  ratingValue: number;

  @ApiProperty({
    description: 'ID of the movie being rated',
    example: 123,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  movieId: number;
}
