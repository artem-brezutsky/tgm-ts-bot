import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule);
  // await app.listen(process.env.PORT ?? 3000);
  console.log('Приложение запущено без HTTP-сервера');
}
bootstrap();
