import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/config/app.config.service';
import { isUserMiddleware } from 'src/middlewares/isUser';
import { UtilsService } from 'src/utils/utils.service';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, UtilsService, AppConfigService, ConfigService]
})
export class ArticlesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isUserMiddleware).forRoutes(
      { path: 'api/articles/create', method: RequestMethod.POST },
      { path: 'ap/articles/:id', method: RequestMethod.DELETE }
    )
  }
}
