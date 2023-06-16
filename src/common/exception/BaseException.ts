import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(
    response: string | Record<string, string | number>,
    status: number,
    private clientCode: number,
  ) {
    super(response, status);
  }

  getClientCode() {
    return this.clientCode;
  }
}
