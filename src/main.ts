import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './user/exceptions/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const { httpAdapter } = app.get(HttpAdapterHost);
  //app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
