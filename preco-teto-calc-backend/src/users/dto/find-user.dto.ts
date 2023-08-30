import { IsString, IsDefined, IsEmail } from 'class-validator';

export class FindUserDto {
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;
}
