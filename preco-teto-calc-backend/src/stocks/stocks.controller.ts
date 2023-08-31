import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post('create')
  create(@Body() data: CreateStockDto, @CurrentUser() user: User) {
    try {
      return this.stocksService.create(data, user);
    } catch (error) {
      return { message: error.message, statusCode: error.status };
    }
  }

  @Get('all')
  findAll(@CurrentUser() user: User) {
    try {
      return this.stocksService.findAll(user);
    } catch (error) {
      return { message: error.message, statusCode: error.status };
    }
  }

  @Get('find')
  findOne(@Query() id) {
    try {
      return this.stocksService.findOne(id);
    } catch (error) {
      return { message: error.message, statusCode: error.status };
    }
  }

  @Patch('update')
  update(@Query() id, @Body() data: UpdateStockDto) {
    try {
      return this.stocksService.update(id, data);
    } catch (error) {
      return {
        message: error.message,
        statusCode: error.status,
      };
    }
  }

  @Delete('delete')
  remove(@Query() id) {
    try {
      return this.stocksService.remove(id);
    } catch (error) {
      return { message: error.message, statusCode: error.status };
    }
  }
}
