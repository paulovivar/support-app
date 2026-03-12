import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { UpdateUserDto } from './users.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  userDni: string;

  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  userPhone: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  secondName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  secondLastName?: string;

  @IsOptional()
  birthDate?: Date;

  @IsString()
  @IsOptional()
  houseNumber?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  parish?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsNumber()
  @IsOptional()
  identificationType?: number;

  @IsNumber()
  @IsOptional()
  legalPerson?: number;

  @IsNumber()
  @IsOptional()
  maritialStatus?: number;

  @IsString()
  @IsOptional()
  spouse?: string;

  @ValidateNested()
  @Type(() => UpdateUserDto)
  @IsNotEmpty()
  user: UpdateUserDto;

  @IsString()
  @IsOptional()
  parishId?: string;

  @IsString()
  @IsOptional()
  cityId?: string;

  @IsString()
  @IsOptional()
  stateId?: string;
}

export class UpdateProfileDto extends PartialType(OmitType(CreateProfileDto, ['user'])) {
  @ValidateNested()
  @Type(() => UpdateUserDto)
  @IsOptional()
  user?: UpdateUserDto;
}
