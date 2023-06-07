import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { UserAuthEntity } from '@/domain/users/entities/user-auth.entity';
import { AuthenticationProvider } from '@/domain/auth/provider/authentication.provider';

@EventSubscriber()
export class UserAuthSubscriber
  implements EntitySubscriberInterface<UserAuthEntity>
{
  listenTo() {
    return UserAuthEntity;
  }

  beforeInsert(event: InsertEvent<UserAuthEntity>): void {
    if (event.entity.password) {
      event.entity.password = AuthenticationProvider.generateHash(
        event.entity.password,
      );
    }
  }

  beforeUpdate(event: UpdateEvent<UserAuthEntity>): void {
    if (event.entity?.password !== event.databaseEntity?.password) {
      event.entity.password = AuthenticationProvider.generateHash(
        event.entity.password,
      );
    }
  }
}
