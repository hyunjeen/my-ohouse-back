import * as bcrypt from 'bcrypt';

export class Utils {
  static generateHash(target: string): string {
    return bcrypt.hashSync(target, 10);
  }

  static validateHash(target: string, hashed: string): boolean {
    return bcrypt.compareSync(target, hashed || '');
  }
}
