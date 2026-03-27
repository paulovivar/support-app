import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'The title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The content of the post', required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'The URL of the cover image', required: false })
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiProperty({ description: 'A brief summary of the post', required: false })
  @IsString()
  @IsOptional()
  summary?: string;

  // @IsString()
  // @IsNotEmpty()
  // profileId: string;

  @ApiProperty({ description: 'An array of category IDs associated with the post', type: [Number], required: false })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  categoryIds?: number[];
}
