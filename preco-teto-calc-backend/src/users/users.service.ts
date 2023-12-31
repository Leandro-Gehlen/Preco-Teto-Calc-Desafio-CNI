import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/shared/db/db.service';

import * as bcrypt from 'bcrypt';
import { ICreateUserResponse } from './interfaces/create-user-response.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: DbService,
    private readonly authService: AuthService,
  ) {}

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

    const createdUser = await this.prisma.user.create({
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
      data: this.authService.login(createdUser),
    };
  }

  async findOne(email: string) {
    console.log(email);
    const hasUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (hasUser) {
      const newHasUser = {
        ...hasUser,
        password: undefined,
      };
      return {
        statusCode: 200,
        message: 'User was found on database.',
        data: {
          status: true,
          user: newHasUser,
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

  getData(user) {
    if (Object(user).length != 0) {
      return {
        statusCode: 200,
        data: {
          firsName: user.firstName,
          lastName: user.lastName,
        },
      };
    }
    throw new HttpException('Provide a valid token.', HttpStatus.BAD_REQUEST);
  }
}
