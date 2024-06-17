import { Module } from '@nestjs/common';

import { SampleModule } from './sample.module';

@Module({
  imports: [SampleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
