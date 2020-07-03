import Notification from '@modules/notifications/infra/typeorm/schemas/notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';
import { ObjectID } from 'mongodb';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    userId,
  }: ICreateNotificationsDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectID(),
      content,
      userId,
      createAt: new Date(Date.now()),
      updateAt: new Date(Date.now()),
    });
    this.notifications.push(notification);
    return notification;
  }
}
export default FakeNotificationsRepository;
