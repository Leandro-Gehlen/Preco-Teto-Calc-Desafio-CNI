import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/shared/db/db.service';

import * as bcrypt from 'bcrypt';
import { ICreateUserResponse } from './interfaces/create-user-response.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DbService) {}

  async create(data: CreateUserDto): Promise<ICreateUserResponse> {
    const hasUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (hasUser) {
      throw new HttpException(
        'User already exists.Please, login.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.user.create({
      data: {
        email: data.email.toLocaleLowerCase(),
        first_name: data.firstName.toLocaleUpperCase(),
        last_name: data.lastName.toLocaleUpperCase(),
        password: await bcrypt.hash(data.password, 10),
      },
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'A new user has been created',
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  //update(id: number, updateUserDto: UpdateUserDto) {
  //  return `This action updates a #${id} user`;
  //}

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
