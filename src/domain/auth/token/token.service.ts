import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public createToken(userId: string): string {
    return this.jwtService.sign({ uuid: userId });
  }

  public createRefreshToken(userId: string): string {
    return this.jwtService.sign(
      { uuid: userId },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
      },
    );
  }
}
