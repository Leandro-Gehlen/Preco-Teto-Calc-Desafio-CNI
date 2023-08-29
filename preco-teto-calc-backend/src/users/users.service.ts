import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/shared/db/db.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DbService) {}

  async create(data: CreateUserDto) {
    console.log(`Esta é a `);
    const hasUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (hasUser) {
      return 'User already exists.Please, login.';
    }

    await this.prisma.user.create({
      data: {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        password: await bcrypt.hash(data.password, 10),
      },
    });

    return 'A new user has been created';
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
