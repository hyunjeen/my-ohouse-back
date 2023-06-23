import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '@/domain/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@/domain/users/users.service';
import { TokenPayload } from '@/domain/auth/token/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET_KEY'),
      ignoreExpiration: true,
    });
  }

  //추후 타입 payload 넣기
  async validate(payload: TokenPayload): Promise<UserEntity> {
    console.log(payload);
    const user = await this.userService.findUser({ uuid: payload.uuid });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
