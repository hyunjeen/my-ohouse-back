import { BadRequestException } from '@nestjs/common';

export class NotValidatePasswordException extends BadRequestException {
  constructor() {
    super('비밀번호가 일치하지 않습니다.');
  }
}
