import { Module } from '@nestjs/common';
import { ComplaintsController } from './complaints.controller';
import { ComplaintsService } from './complaints.service';
import { Complaint, ComplaintSchema } from './schemas/complaint.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';


@Module({
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
  imports: [
    MongooseModule.forFeature([
      { name: Complaint.name, schema: ComplaintSchema },
    ]),
  ],
  // ...controllers, providers, etc.
})
export class ComplaintsModule {}
