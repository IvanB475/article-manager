import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleEntity } from "src/articles/article.entity";
import { AppConfigModule } from "src/config/app.config.module";
import { AppConfigService } from "src/config/app.config.service";
import { UserEntity } from "src/users/user.entity";




export const databaseConfig = TypeOrmModule.forRootAsync({
    imports: [AppConfigModule],
    useFactory: (appConfigService: AppConfigService) => ({
        type: 'postgres',
        host: appConfigService.db_host,
        port: appConfigService.db_port,
        username: appConfigService.db_username,
        password: appConfigService.db_password,
        database: appConfigService.db_database,
        entities: [ArticleEntity, UserEntity],
        synchronize: true
    }),
    inject: [AppConfigService]
})