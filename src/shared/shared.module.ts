import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedService } from './shared.service';
import { SharedController } from './shared.controller';
import { Complaint, ComplaintSchema } from '../complaints/schemas/complaint.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Complaint.name, schema: ComplaintSchema }]),
  ],
  controllers: [SharedController],
  providers: [SharedService],
})
export class SharedModule {}

