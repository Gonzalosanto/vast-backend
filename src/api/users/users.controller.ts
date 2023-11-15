import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findUser(@Req() request: Request) {
    return this.usersService.findOne(request.body);
  }
  @Put()
  updateUser(@Req() request: Request) {
    return this.usersService.update(request.body, {});
  }
  @Delete()
  deleteUser(@Req() request: Request) {
    return this.usersService.delete(request.body);
  }

  @Post()
  createUser(@Req() request: Request) {
    return this.usersService.create(request.body);
  }
}
