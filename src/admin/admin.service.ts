// admin.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class AdminService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly db: Db) {}

  async findAllUsersExceptSelf(currentUserId: string) {
    return await this.db
      .collection('users')
      .find({ _id: { $ne: new ObjectId(currentUserId) } })
      .toArray();
  }
}
