import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
//import { UpdateStockDto } from './dto/update-stock.dto';
import { DbService } from 'src/shared/db/db.service';
import { TopPriceCalcService } from 'src/shared/helpers/top-price-calc/top-price-calc.service';
import { User } from '@prisma/client';

@Injectable()
export class StocksService {
  constructor(
    private readonly dbService: DbService,
    private readonly topPriceCalcService: TopPriceCalcService,
  ) {}
  async create(data: CreateStockDto, user: User) {
    try {
      const newStock = await this.dbService.stock.create({
        data: {
          asset_name: data.assetName,
          asset_code: data.assetCode,
          percentage: data.percentage,
          year1: data.year1,
          year2: data.year2,
          year3: data.year3,
          year4: data.year4,
          year5: data.year5,
          top_price: this.topPriceCalcService.calc(data),
          userId: user.id,
        },
      });

      if (newStock) {
        const stockList: any = await this.dbService.stock.findMany({
          where: {
            userId: user.id,
          },
          orderBy: {
            created_at: 'asc',
          },
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const newStockList = stockList.map(({ userId, ...item }) => item);
        return newStockList;
      }
    } catch (error) {
      throw new HttpException(
        'Can´t create a new register. Provide a valid token',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException(
      'Can´t create a new register. Please, try again.',
      HttpStatus.BAD_REQUEST,
    );
  }

  async findAll(user: User) {
    try {
      const stockList = await this.dbService.stock.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          created_at: 'asc',
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newStockList = stockList.map(({ userId, ...item }) => item);
      return newStockList;
    } catch (error) {
      throw new HttpException(
        'Can´t create a new register. Provide a valid token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne({ id }) {
    try {
      const stock = await this.dbService.stock.findUnique({
        where: {
          stock_id: id,
        },
      });
      console.log(stock);
      const arrStock = [];
      arrStock.push(stock);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newArrWithStockInside = arrStock.map(({ userId, ...item }) => item);
      return newArrWithStockInside;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Can´t find this stock on our database. Provide a valid id',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /*  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  } */

  async remove({ id }) {
    try {
      await this.dbService.stock.delete({
        where: {
          stock_id: id,
        },
      });

      return { message: 'Stock record was excluded from our database' };
    } catch (error) {
      throw new HttpException(
        'Can´t exclude this stock record. Provide a valid id',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
