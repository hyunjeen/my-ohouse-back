import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Utils } from '@/utils';
import { UserEntity } from '@/domain/users/entities/user.entity';

@EventSubscriber()
export class UserAuthSubscriber
  implements EntitySubscriberInterface<UserEntity>
{
  listenTo() {
    return UserEntity;
  }

  beforeInsert(event: InsertEvent<UserEntity>): void {
    if (event.entity.password) {
      event.entity.password = Utils.generateHash(event.entity.password);
    }
  }

  beforeUpdate(event: UpdateEvent<UserEntity>): void {
    if (event.entity?.password !== event.databaseEntity?.password) {
      event.entity.password = Utils.generateHash(event.entity.password);
    }

    if (event.entity?.refreshToken) {
      event.entity.refreshToken = Utils.generateHash(event.entity.refreshToken);
    }
  }
}
