import { Controller, Get, Post, Body, Patch, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ICreateUserResponse } from './interfaces/create-user-response.interface';
import { IGetUserResponse } from './interfaces/find-user-response.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';

//import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ICreateUserResponse> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      return { message: error.message, statusCode: error.status };
    }
  }

  @Get('find')
  async findOne(@Query() data: FindUserDto): Promise<IGetUserResponse> {
    try {
      return await this.usersService.findOne(data.email);
    } catch (error) {
      return {
        message: error.message,
        statusCode: error.status,
        data: { status: false },
      };
    }
  }

  @Patch('update')
  update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (error) {
      return {
        message: error.message,
        statusCode: error.status,
      };
    }
  }
}
