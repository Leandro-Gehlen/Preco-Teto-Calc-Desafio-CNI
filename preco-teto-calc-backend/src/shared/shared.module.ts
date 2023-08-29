import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DbService } from './db/db.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DbService],
  exports: [DbService],
})
export class SharedModule {}
