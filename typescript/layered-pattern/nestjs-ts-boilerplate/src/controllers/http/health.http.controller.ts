import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetHealthService } from '@services';

@ApiTags()
@Controller()
export class HealthHttpController {
  constructor(private readonly getHealthService: GetHealthService) {}

  @Get('/health')
  health(): Promise<undefined> {
    return this.getHealthService.health();
  }
}
