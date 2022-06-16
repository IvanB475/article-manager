import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUserDto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {

    }

    @Post('/create')
    async createUserController(@Body() createUserInfo: CreateUserDto) {
        try {
            await this.usersService.createUserService(createUserInfo.username, createUserInfo.password);
            return 'new user was successfully created';
        } catch (err) {
            const ERR_MESSAGE = 'failed creating user';
            const ERR_STATUS = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }
}
