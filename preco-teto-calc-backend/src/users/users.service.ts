import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/shared/db/db.service';

import * as bcrypt from 'bcrypt';
import { ICreateUserResponse } from './interfaces/create-user-response.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';

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

  async findOne(id: FindUserDto) {
    const hasUser = await this.prisma.user.findFirst({
      where: {
        id: id.id,
      },
    });
    if (hasUser) {
      return {
        statusCode: 200,
        message: 'User was found on database.',
        data: {
          status: true,
          user: hasUser,
        },
      };
    }

    throw new HttpException(
      'User was not found on our database.',
      HttpStatus.BAD_REQUEST,
    );
  }

  async update(id: string, userData: UpdateUserDto) {
    const hasUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!hasUser) {
      throw new HttpException(
        'User not found on our database.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        first_name: userData.firstName.toUpperCase(),
        last_name: userData.lastName.toUpperCase(),
        email: userData.email.toLocaleLowerCase(),
        password: await bcrypt.hash(userData.password, 10),
      },
    });
    return {
      statusCode: 200,
      message: 'User was updated on database.',
    };
  }
}
