import { Injectable } from '@nestjs/common';
import { CreateStockDto } from 'src/stocks/dto/create-stock.dto';

@Injectable()
export class TopPriceCalcService {
  calc(data: CreateStockDto) {
    let newData;
    if (data.percentage) {
      newData = {
        ...data,
        year1: parseFloat(data.year1),
        year2: parseFloat(data.year2),
        year3: parseFloat(data.year3),
        year4: parseFloat(data.year4),
        year5: parseFloat(data.year5),
        percentage: parseFloat(data.percentage),
      };
    } else {
      newData = {
        ...data,
        year1: parseFloat(data.year1),
        year2: parseFloat(data.year2),
        year3: parseFloat(data.year3),
        year4: parseFloat(data.year4),
        year5: parseFloat(data.year5),
        percentage: 0.06,
      };
    }

    const y1 = newData.year1;
    const y2 = newData.year2;
    const y3 = newData.year3;
    const y4 = newData.year4;
    const y5 = newData.year5;
    const p = newData.percentage;

    const calcYearAvarage = (y1 + y2 + y3 + y4 + y5) / 5;

    const calcTopPrice = calcYearAvarage / p;
    return calcTopPrice.toString();
  }
}
