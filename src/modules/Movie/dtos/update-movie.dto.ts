import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateMovieDto {
  @ApiPropertyOptional({
    description: 'The updated title of the movie',
    example: 'Inception: The Extended Cut',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({
    description: 'An updated detailed description of the movie',
    example:
      'An extended version of the mind-bending thriller about dream manipulation.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'The updated release date of the movie in ISO format',
    example: '2010-12-01',
  })
  @IsOptional()
  @IsDateString()
  releasedAt?: Date;

  @ApiPropertyOptional({
    description: 'The updated duration of the movie in minutes',
    example: 160,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  duration?: number;

  @ApiPropertyOptional({
    description: 'The updated genre of the movie',
    example: 'Science Fiction, Thriller',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  genre?: string;

  @ApiPropertyOptional({
    description: 'The updated language of the movie',
    example: 'Spanish',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  language?: string;
}
