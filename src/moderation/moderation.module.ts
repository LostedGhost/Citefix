import { Module } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ModerationController } from './moderation.controller';

@Module({
  providers: [ModerationService],
  controllers: [ModerationController]
})
export class ModerationModule {}
