import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'The title of the movie',
    example: 'Inception',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'A detailed description of the movie',
    example: 'A mind-bending thriller about dream manipulation.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The release date of the movie in ISO format',
    example: '2010-07-16',
  })
  @IsNotEmpty()
  @IsDateString()
  releasedAt: Date;

  @ApiProperty({
    description: 'The duration of the movie in minutes',
    example: 148,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  duration: number;

  @ApiProperty({
    description: 'The genre of the movie',
    example: 'Science Fiction',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  genre: string;

  @ApiProperty({
    description: 'The language of the movie',
    example: 'English',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  language: string;
}
