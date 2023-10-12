import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findUser(@Req() request: Request) {
    return this.usersService.findOne(request.body);
  }

  @Post()
  createUser(@Req() request: Request) {
    return this.usersService.create(request.body);
  }
}
