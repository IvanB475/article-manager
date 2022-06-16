import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Injectable()
export class ArticlesService {
    constructor(private entityManager: EntityManager) {

    }
    async getArticleService(articleId: number) {
        const article = await this.entityManager.findOneByOrFail(ArticleEntity, { id: articleId });
        return article;
    }
}
