import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
dotenv.config();



async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.allowedOrigin,
      credentials: true,
    }
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Ocso API')
    .setDescription('API for ocso managment')
    .setVersion('0.9')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(4000)
}
bootstrap();