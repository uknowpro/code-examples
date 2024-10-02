import { Module } from '@nestjs/common';

import { HelloController } from '../controllers';
import { HelloService } from '../services';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
