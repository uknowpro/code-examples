import fs from 'fs';
import { join } from 'path';

import { Injectable, Scope } from '@nestjs/common';

import { ServeStaticSwaggerJsonQuery } from '@core/queries';

let swagger;

@Injectable({ scope: Scope.REQUEST })
export class SwaggerService implements ServeStaticSwaggerJsonQuery {
  constructor() {}

  async serveStaticSwaggerJson(): Promise<string> {
    if (!swagger) {
      swagger = fs.readFileSync(`${join(process.cwd(), '/swagger.json')}`);
    }
    return swagger.toString();
  }
}
