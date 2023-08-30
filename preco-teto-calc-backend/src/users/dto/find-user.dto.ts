import { IsString, IsDefined } from 'class-validator';

export class FindUserDto {
  @IsString()
  @IsDefined()
  id: string;
}
