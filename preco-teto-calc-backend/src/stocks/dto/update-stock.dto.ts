import { IsOptional, IsString } from 'class-validator';

export class UpdateStockDto {
  @IsOptional()
  @IsString()
  percentage: string;

  @IsOptional()
  @IsString()
  assetName?: string;

  @IsOptional()
  @IsString()
  assetCode: string;

  @IsOptional()
  @IsString()
  year1: string;

  @IsOptional()
  @IsString()
  year2: string;

  @IsOptional()
  @IsString()
  year3: string;

  @IsOptional()
  @IsString()
  year4: string;

  @IsOptional()
  @IsString()
  year5: string;

  @IsOptional()
  @IsString()
  topPrice: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
