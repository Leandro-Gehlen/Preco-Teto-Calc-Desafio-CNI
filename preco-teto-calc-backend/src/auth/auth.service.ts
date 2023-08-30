import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { IUserPayload } from './interfaces/user-payload';
import { JwtService } from '@nestjs/jwt';
import { IUserToken } from './interfaces/user-token.interface';
import { DbService } from 'src/shared/db/db.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: DbService,

    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.dbService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const newUser = {
          ...user,
          password: undefined,
        };
        return newUser;
      }
    }
    throw new Error('Email address or password incorrect.');
  }
  login(user: User): IUserToken {
    const payload: IUserPayload = {
      sub: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return { access_token: jwtToken };
  }
}
