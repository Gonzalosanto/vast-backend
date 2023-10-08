import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';

@Controller('login')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findUser(@Req() request : Request) {
        return this.usersService.findSomeUser()
    }

    @Post()
    createUser(@Req() request : Request){
        return this.usersService.create(request.body);
    }
}