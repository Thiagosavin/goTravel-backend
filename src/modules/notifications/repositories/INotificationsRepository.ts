import Notification from '@modules/notifications/infra/typeorm/schemas/notification';
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';

export default interface INotificationsRepository {
  create(data: ICreateNotificationsDTO): Promise<Notification>;
}
