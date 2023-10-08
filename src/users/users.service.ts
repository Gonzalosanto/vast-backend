import { Body, Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface'

@Injectable()
export class UsersService {
    // private readonly users: User[] = []
    private user: User
    private readonly users = [
        {
            username:'Caro',
            password:'cannabis420',
            role:'administrator',
        },
        {
            username:'Mapache',
            password:'basura696',
            role:'administrator',
        },
        {
            username:'Apu',
            password:'quemado000',
            role:'staff',
        }
    ]

    async findOne(username:string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    findSomeUser() {
        const someUser = {
            username: 'Mapache',
            password: 'unmapachemas',
            role:'developer'
        }
        return someUser;
    }

    findAll(): User[] {
        return this.users;
    }

    create(@Body() body: BodyInit){
        return 
    }
    update(@Body() body: BodyInit){
        return 
    }
    delete(@Body() body: BodyInit){
        return 
    }
}
