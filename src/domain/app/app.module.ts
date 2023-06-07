import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { NODE_ENV } from '@/constants/app.constants';
import { DatabaseModule } from '@/database/database.module';
import { AppController } from '@/domain/app/app.controller';
import { AppService } from '@/domain/app/app.service';
import { AuthModule } from '@/domain/auth/auth.module';
import { UsersModule } from '@/domain/users/users.module';
import { SharedModule } from '@/domain/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string()
          .required()
          .valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION),
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required().allow(''),
        MYSQL_DB: Joi.string().required(),
      }),
    }),
    SharedModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
