import { BadRequestException } from '@nestjs/common';

export class AlreadyUserException extends BadRequestException {
  constructor() {
    super('이미 존재하는 회원입니다');
  }
}
