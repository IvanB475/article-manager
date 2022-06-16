import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dtos/createArticleDto';

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

    @Post('/create')
    async createArticleController(@Body() articleInfo: CreateArticleDto) {
        try {
            return this.articlesService.createArticleService(articleInfo);
        } catch(err) {
            const ERR_MESSAGE = 'failed creating article';
            const ERR_STATUS = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }
}
