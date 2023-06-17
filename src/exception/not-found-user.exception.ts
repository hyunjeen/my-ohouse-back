import { NotFoundException } from '@nestjs/common';

export class NotFoundUserException extends NotFoundException {
  constructor() {
    super('존재하지 않는 회원 입니다.');
  }
}
