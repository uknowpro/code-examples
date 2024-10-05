import { Module } from '@nestjs/common';

import { HealthController, SwaggerController } from '@controllers';
import { TerminusModule } from '@nestjs/terminus';
import { OrmModule } from './orm.module';

@Module({
  imports: [TerminusModule, OrmModule],
  controllers: [HealthController, SwaggerController],
  providers: [],
})
export class HealthModule {}
