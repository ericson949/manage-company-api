import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT, process.env.HOST);
  // await app.listen(process.env.PORT || 3000);
}
bootstrap();
