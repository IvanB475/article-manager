import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
    constructor(private articlesService: ArticlesService) { }


    @Get('/:id')
    async getArticleController(@Param('id') articleId: number) {
        try {
            return this.articlesService.getArticleService(articleId);
        } catch (err) {
            const ERR_MESSAGE = 'failed fetching article';
            const ERR_STATUS = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }
}
