import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SharedModule } from './shared/shared.module';
import { StocksModule } from './stocks/stocks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SharedModule, StocksModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
