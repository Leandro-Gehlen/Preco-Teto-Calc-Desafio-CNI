import {
  IsString,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
  MaxLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @IsStrongPassword()
  password: string;
}
