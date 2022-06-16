import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dtos/createArticleDto';

@Injectable()
export class ArticlesService {
    constructor(private entityManager: EntityManager) {

    }
    async getArticleService(articleId: number) {
        const article = await this.entityManager.findOneByOrFail(ArticleEntity, { id: articleId });
        return article;
    }

    async createArticleService(articleInfo: CreateArticleDto) {
        const { title, slug, published_at } = articleInfo;

        const newArticle = new ArticleEntity();
        newArticle.title = title;
        newArticle.slug = slug;
        newArticle.published_at = published_at || null;
        await newArticle.save();

        const SUCCESS_MESSAGE = 'created new article';
        const responseToUser = {
            message: SUCCESS_MESSAGE
        }
        return responseToUser;
    }
}
