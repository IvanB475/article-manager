import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/config/app.config.service';
import { UtilsService } from 'src/utils/utils.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UtilsService,AppConfigService, ConfigService]
})
export class UsersModule { }
