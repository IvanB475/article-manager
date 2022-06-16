import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AppConfigService } from './config/app.config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);
  const PORT = appConfig.api_port;
  app.use(cookieParser());
  await app.listen(PORT);
}
bootstrap();
