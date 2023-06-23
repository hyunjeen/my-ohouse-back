import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@/domain/users/entities/user.entity';

export const getUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
