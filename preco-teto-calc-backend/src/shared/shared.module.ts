import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DbService } from './db/db.service';
import { TopPriceCalcService } from './helpers/top-price-calc/top-price-calc.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DbService, TopPriceCalcService],
  exports: [DbService, TopPriceCalcService],
})
export class SharedModule {}
