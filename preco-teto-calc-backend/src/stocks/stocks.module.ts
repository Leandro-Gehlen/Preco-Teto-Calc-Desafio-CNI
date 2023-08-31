import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [StocksController],
  providers: [StocksService],
  imports: [SharedModule],
  exports: [StocksService],
})
export class StocksModule {}
