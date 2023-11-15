import { Body, Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private userRepository: typeof User) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username: username } });
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
  async create(@Body() body: any[]) {
    return this.userRepository.bulkCreate(body);
  }
  async update(valuesToUpdate: any, options: any) {
    return this.userRepository.update(valuesToUpdate, options);
  }
  async delete(body: any) {
    return this.userRepository.destroy(body);
  }
}
