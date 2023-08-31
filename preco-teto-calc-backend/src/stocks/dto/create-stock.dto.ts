import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateStockDto {
  @IsOptional()
  @IsString()
  percentage: string;

  @IsOptional()
  @IsString()
  assetName?: string;

  @IsDefined()
  @IsString()
  assetCode: string;

  @IsDefined()
  @IsString()
  year1: string;

  @IsDefined()
  @IsString()
  year2: string;

  @IsDefined()
  @IsString()
  year3: string;

  @IsDefined()
  @IsString()
  year4: string;

  @IsDefined()
  @IsString()
  year5: string;

  @IsOptional()
  @IsString()
  topPrice: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
