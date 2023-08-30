import { Injectable } from '@nestjs/common';
import { FindUserDto } from 'src/users/dto/find-user.dto';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.data.user.password);

      if (isMatch) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('Email address or password incorrect.');
  }
  login() {
    return 'Liberado';
  }
}
