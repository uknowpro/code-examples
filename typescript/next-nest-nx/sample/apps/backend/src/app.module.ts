import { Module } from '@nestjs/common';

import { HelloModule } from './modules';

@Module({
  imports: [HelloModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
