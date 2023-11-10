import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './api/users/users.service';
import { UsersController } from './api/users/users.controller';
import { UsersModule } from './api/users/users.module';
import { MacrosModule } from './api/macros/macros.module';
import { ReportsService } from './api/reports/reports.service';
import { ReportsModule } from './api/reports/reports.module';
import { ReportsController} from './api/reports/reports.controller';
import { KafkaModule } from './main/kafka/kafka.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    MacrosModule,
    ReportsModule,
    KafkaModule
  ],
  controllers: [UsersController, ReportsController],
  providers: [UsersService, ReportsService],
})
export class AppModule {}
