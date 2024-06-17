import { Module } from '@nestjs/common';

import { GetHealthService, SwaggerService } from '@services';
import { HealthHttpController, SwaggerHttpController } from '@controllers';

@Module({
  imports: [],
  controllers: [HealthHttpController, SwaggerHttpController],
  providers: [GetHealthService, SwaggerService],
})
export class WebModule {}
