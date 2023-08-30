import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from '@prisma/client';
import { IAuthRequest } from '../interfaces/auth-request.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<IAuthRequest>();

    return request.user;
  },
);
