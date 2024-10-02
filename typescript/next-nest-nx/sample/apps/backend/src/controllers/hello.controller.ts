import { Controller, Get } from '@nestjs/common';

import { HelloService } from '../services/hello.service';

@Controller()
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getData() {
    return this.helloService.execute();
  }
}
