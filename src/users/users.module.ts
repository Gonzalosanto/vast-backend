import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { userProviders } from './users.providers';
import { DatabaseModule } from 'src/core/database.module';
import { UsersController } from './users.controller';
@Module({
  imports:[DatabaseModule],
  controllers:[UsersController],
  providers: [UsersService, ...userProviders],
  exports: [UsersService, ...userProviders]
})
export class UsersModule {}
