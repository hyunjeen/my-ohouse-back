import { Data } from 'pako';

export interface TokenPayload {
  uuid: string;
  iat: Date;
  ext: Data;
}
