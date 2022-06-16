import { Module } from '@nestjs/common';
import { databaseConfig } from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { AppConfigModule } from './config/app.config.module';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [ArticlesModule, UsersModule, AppConfigModule, UtilsModule, databaseConfig],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
