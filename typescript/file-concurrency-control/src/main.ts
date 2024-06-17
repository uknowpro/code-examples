import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from '@modules';

const FASTIFY_OPTIONS = {
  connectionTimeout: 0, // default no limit
  keepAliveTimeout: 7200, // default 72 seconds
  maxRequestsPerSocket: 0, // default no limit
  requestTimeout: 0, // default no limit
  disableRequestLogging: false, // default false
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(FASTIFY_OPTIONS),
  );

  app.enableShutdownHooks();

  await app.listen(3000);
}

bootstrap();
