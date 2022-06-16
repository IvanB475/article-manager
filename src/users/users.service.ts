import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        private utilsService: UtilsService
    ) { }

    async createUserService(username: string, password: string) {
        const hashedPassword = await this.utilsService.hashPassword(password);
        const newUser = new UserEntity();
        newUser.username = username;
        newUser.password = hashedPassword;
        return await newUser.save();
    }
}
