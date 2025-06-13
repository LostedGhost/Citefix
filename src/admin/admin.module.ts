// admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongoProvider } from '../mongodb.providers';

@Module({
  controllers: [AdminController],
  providers: [AdminService, MongoProvider],
})
export class AdminModule {}
