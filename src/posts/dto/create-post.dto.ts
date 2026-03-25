import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsString()
  @IsOptional()
  summary?: string;

  // @IsString()
  // @IsNotEmpty()
  // profileId: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  categoryIds?: number[];
}
