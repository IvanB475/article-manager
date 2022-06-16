import { ForbiddenException, HttpException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { UtilsService } from "src/utils/utils.service";



@Injectable()
export class isUserMiddleware implements NestMiddleware {
    constructor(
        private utilsService: UtilsService
    ) { }

    async use(req: Request, _: Response, next: NextFunction) {
        const token = req.cookies.access_token;
        if (!token) {
            throw new ForbiddenException('You are not allowed to use this route');
        }
        const userId = this.utilsService.getUserIdFromToken(token);
        if (!userId) {
            const ERR_MESSAGE = 'you are not allowed to use this route';
            const ERR_STATUS = 403;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS)
        }

        next()
    }
}