import { getMongoRepository, MongoRepository } from 'typeorm';
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '@modules/notifications/infra/typeorm/schemas/notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    userId,
  }: ICreateNotificationsDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      userId,
    });
    await this.ormRepository.save(notification);
    return notification;
  }
}
export default NotificationsRepository;
