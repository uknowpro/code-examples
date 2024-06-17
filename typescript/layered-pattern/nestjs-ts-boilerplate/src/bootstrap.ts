import { FastifyInstance } from 'fastify';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';

import { CustomLogger } from '@custom/loggers';

export const createApp = async (
  appModule: any,
  fastifyOptions?: any,
  instance?: FastifyInstance,
): Promise<NestFastifyApplication> => {
  const app = await NestFactory.create<NestFastifyApplication>(
    appModule,
    instance ? new FastifyAdapter(instance) : new FastifyAdapter(fastifyOptions),
    {
      bufferLogs: false,
      logger: new CustomLogger(),
      bodyParser: false,
    },
  );

  return app;
};

export const createSwagger = (app: NestFastifyApplication): OpenAPIObject => {
  const options = new DocumentBuilder()
    .setTitle('AI Learning REST API')
    .setDescription(
      `
      AI Learning 서버에서 제공되는 REST API
    `,
    )
    .setVersion('3.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);

  return document;
};
