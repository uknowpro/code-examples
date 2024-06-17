import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SwaggerService } from '@services';

@ApiTags()
@Controller()
export class SwaggerHttpController {
  constructor(private readonly swaggerService: SwaggerService) {}

  @Get('/swagger.json')
  swagger(): Promise<string> {
    return this.swaggerService.serveStaticSwaggerJson();
  }
}
