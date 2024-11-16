import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  readonly phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly quater?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly file?: string;

  @ApiProperty({ required: true })
  @IsLongitude()
  readonly longitude?: string;

  @ApiProperty({ required: true })
  @IsLatitude()
  readonly latitude?: string;
}
