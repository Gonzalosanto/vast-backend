import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { BundleModule } from './api/bundles/bundles.module';
import { MacrosModule } from './macros/macros.module';
import { ReportsService } from './api/reports/reports.service';
import { ReportsModule } from './api/reports/reports.module';
import { ReportsController} from './api/reports/reports.controller';
import { WhitelistsModule } from './api/whitelists/whitelists.module';


@Module({
  imports: [AuthModule, UsersModule, BundleModule, MacrosModule,ReportsModule,WhitelistsModule,],
  controllers: [UsersController, ReportsController],
  providers: [UsersService, ReportsService],
})
export class AppModule {}
