import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { UserEntity } from './user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        private utilsService: UtilsService,
        private entityManager: EntityManager
    ) { }

    async createUserService(username: string, password: string) {
        const hashedPassword = await this.utilsService.hashPassword(password);
        const newUser = new UserEntity();
        newUser.username = username;
        newUser.password = hashedPassword;
        return await newUser.save();
    }


    async loginUserService(username: string, password: string) {
        const user = await this.entityManager.findOneBy(UserEntity, { username })
        const isAuthenticated = await this.utilsService.validateLogin(password, user.password);
        if (!isAuthenticated) {
            const FAILURE_RESPONSE_MESSAGE = 'wrong username or password';
            throw new UnauthorizedException(FAILURE_RESPONSE_MESSAGE);
        }

        const token = this.utilsService.generateToken(user.id);

        return token;
    }
}
