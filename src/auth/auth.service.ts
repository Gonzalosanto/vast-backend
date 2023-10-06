import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService){}

    async signIn(username: string, pass: string): Promise<any>{
        const user = await this.usersService.findOne(username);
        console.log({pass})
        if(user?.password !== pass) throw new UnauthorizedException();
        const payload = {username: user.username, role: user.role};
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
