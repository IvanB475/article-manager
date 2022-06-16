import { Body, Controller, HttpException, Post, Response } from '@nestjs/common';
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

    //Should avoid using CreateUserDto here. It adds dependancy on /create endpoint never changing(accepting new arguments).
    // Better practice would be creating for example UserAuthDto which both CreateUserDto and LoginUserDto would extend.
    @Post('/login')
    async loginUserController(@Body() loginUserInfo: CreateUserDto, @Response() response) {
        try {
            const token = await this.usersService.loginUserService(loginUserInfo.username, loginUserInfo.password);
            response.cookie('access_token', token, {
                httpOnly: true,
                maxAge: '3600000'
            })
            const SUCCESS_MESSAGE = 'you have been logged in';
            return response.send({ message: SUCCESS_MESSAGE });
        } catch (err) {
            console.log(err);
            const ERR_MESSAGE = ' Login failed';
            const ERR_STATUS = 500;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }
}
