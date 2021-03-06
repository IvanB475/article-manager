import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dtos/createArticleDto';

@Injectable()
export class ArticlesService {
    constructor(private entityManager: EntityManager) {

    }
    async getArticleService(articleId: number, authenticated: boolean) {
        if (authenticated) {
            return await this.entityManager.findOneBy(ArticleEntity, { id: articleId });
        }
        return await this.entityManager.findOneBy(ArticleEntity, { id: articleId, private: false });
    }

    async createArticleService(articleInfo: CreateArticleDto) {
        const { title, slug, published_at } = articleInfo;

        const newArticle = new ArticleEntity();
        newArticle.title = title;
        newArticle.slug = slug;
        newArticle.published_at = published_at || null;
        newArticle.private = articleInfo.private;
        await newArticle.save();

        const SUCCESS_MESSAGE = 'created new article';
        const responseToUser = {
            message: SUCCESS_MESSAGE
        }
        return responseToUser;
    }

    //handle case if article with that id doesnt exist
    async deleteArticleService(articleId: number) {
        await this.entityManager.delete(ArticleEntity, { id: articleId });
        const SUCCESS_MESSAGE = 'deleted the article';
        const responseToUser = {
            message: SUCCESS_MESSAGE
        }
        return responseToUser;
    }


    async getPublishedArticlesService(limit: number, page: number, authenticated: boolean) {
        if (authenticated) {
            return await this.entityManager.createQueryBuilder(ArticleEntity, 'article').where('article.published_at < NOW()').take(limit).skip(page).getMany();
        } else {
            return await this.entityManager.createQueryBuilder(ArticleEntity, 'article').where('article.published_at <= NOW()').andWhere('article.private = false').take(limit).skip(page).getMany();
        }
    }
}
