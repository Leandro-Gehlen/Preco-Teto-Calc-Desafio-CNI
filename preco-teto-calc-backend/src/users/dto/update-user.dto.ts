import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(20)
  @IsStrongPassword()
  password: string;
}
