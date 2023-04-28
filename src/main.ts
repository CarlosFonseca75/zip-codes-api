// Dependencies.
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

// Modules.
import { AppModule } from './app.module';

async function bootstrap() {
  // App.
  const app = await NestFactory.create(AppModule);

  // Cors.
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Cookies.
  app.use(cookieParser());

  // Server listening.
  await app.listen(4000);
}

bootstrap();