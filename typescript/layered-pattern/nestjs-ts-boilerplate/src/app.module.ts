import { Module } from '@nestjs/common';

import { DataAccessModule, WebModule } from '@custom/modules';

import { CustomLogger } from '@custom/loggers';
import { RequestContextModule } from '@custom/middlewares';

@Module({
  imports: [
    // OrmModule,
    WebModule,
    RequestContextModule,
    DataAccessModule,
  ],
  controllers: [],
  providers: [CustomLogger],
})
export class AppModule {}
