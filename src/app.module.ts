import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';
import { RewardsModule } from './rewards/rewards.module';
import { AdminModule } from './admin/admin.module';
import { ModerationModule } from './moderation/moderation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }), 
    SharedModule, 
    AuthModule, 
    UsersModule, 
    ComplaintsModule, 
    CommentsModule, 
    ReactionsModule, 
    RewardsModule, 
    AdminModule, 
    ModerationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
