import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { connectToDatabase } from './config/database';

connectToDatabase();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // ← crucial pour transformer le payload en DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
