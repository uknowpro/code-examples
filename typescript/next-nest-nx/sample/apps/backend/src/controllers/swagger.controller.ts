import fs from 'fs';
import { Controller, Get, Scope } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller({ scope: Scope.REQUEST })
export class SwaggerController {
  private readonly swaggerJson;
  constructor() {
    this.swaggerJson = fs.readFileSync('./apps/backend/swagger.json');
  }

  @Get('/swagger-json')
  swagger(): Promise<string> {
    return this.swaggerJson.toString();
  }
}
