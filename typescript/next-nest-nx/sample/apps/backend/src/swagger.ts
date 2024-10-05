import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import * as modules from './modules';

export const createSwagger = (app: NestFastifyApplication): OpenAPIObject => {
  const options = new DocumentBuilder()
    .setTitle('Earnings Letter REST API')
    .setDescription('Earnings Letter 서버에서 제공되는 REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: Object.values(modules),
  });

  return document;
};
