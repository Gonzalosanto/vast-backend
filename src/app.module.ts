import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './api/users/users.service';
import { UsersController } from './api/users/users.controller';
import { UsersModule } from './api/users/users.module';
import { MacrosModule } from './api/macros/macros.module';
import { ReportsModule } from './api/reports/reports.module';
import { WhitelistsModule } from './api/whitelists/whitelists.module';
import { KafkaModule } from './main/kafka/kafka.module';
import { UrlProducerService } from './main/url-producer/url-producer.service';
import { UserAgentsModule } from './main/user-agents/user-agents.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    UserAgentsModule,
    MacrosModule,
    ReportsModule,
    WhitelistsModule,
    ReportsModule,
    KafkaModule
  ],
  controllers: [UsersController],
  providers: [UsersService,  UrlProducerService],
})
export class AppModule {}
