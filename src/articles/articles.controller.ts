import { All, Body, Controller, Delete, Get, HttpException, Param, Post, Query, Request, Response, UsePipes } from '@nestjs/common';
import { schema } from 'src/validation/joiSchema';
import { JoiValidationPipe } from 'src/validation/joiValidationPipe';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dtos/createArticleDto';

@Controller('api/articles')
export class ArticlesController {
    constructor(private articlesService: ArticlesService) { }

    @Get('/published')
    async getPulishedArticlesController(@Query('limit') limit: number, @Query('page') page: number, @Request() req) {
        try {
            let authenticated;
            if(req?.cookies?.access_token) {
                authenticated = true;
            }
            const resultsToReturn = limit || 10;
            const howManyPagesToSkip = page - 1 >= 0 ? page - 1 : 0;
            return await this.articlesService.getPublishedArticlesService(resultsToReturn, howManyPagesToSkip, authenticated);
        } catch (err) {
            console.log(err);
            const ERR_MESSAGE = 'failed fetching articles';
            const ERR_STATUS = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }


    @Get('/:id')
    async getArticleController(@Param('id') articleId: number, @Request() req) {
        try {
            let authenticated;
            if(req?.cookies?.access_token) {
                authenticated = true;
            }
            return this.articlesService.getArticleService(articleId, authenticated);
        } catch (err) {
            const ERR_MESSAGE = 'failed fetching article';
            const ERR_STATUS = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }

    @Post('/create')
    @UsePipes(new JoiValidationPipe(schema.createArticle))
    async createArticleController(@Body() articleInfo: CreateArticleDto) {
        try {
            return this.articlesService.createArticleService(articleInfo);
        } catch (err) {
            const ERR_MESSAGE = 'failed creating article';
            const ERR_STATUS = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }


    @Delete('/:id')
    async deleteArticleController(@Param('id') articleId: number) {
        try {
            return this.articlesService.deleteArticleService(articleId);
        } catch (err) {
            const ERR_MESSAGE = 'failed while deleting article';
            const ERR_STATUS = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }

    @All('*')
    async wrongRouteOrMethod(@Request() req, @Response() response) {
            response.status = 404;
            const ERR_MESSAGE = `Route on path ${req.path} with ${req.method} does not exist`;
            response.send({message: ERR_MESSAGE});
    }
}
