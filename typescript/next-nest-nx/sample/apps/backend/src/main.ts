import { writeFileSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { createSwagger } from './swagger';

const FASTIFY_OPTIONS = {
  connectionTimeout: 0, // default no limit
  keepAliveTimeout: 7200, // default 72 seconds
  maxRequestsPerSocket: 0, // default no limit
  requestTimeout: 0, // default no limit
  disableRequestLogging: process.env.STAGE === 'prod', // default false
  // bodyLimit: 20971520, // 20MB
};

const CORS_OPTIONS = {
  origin: ['*'],
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept',
    'Content-Type',
    'Authorization',
  ],
  exposedHeaders: 'Authorization',
  credentials: true,
  methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
};

const createApp = async (
  appModule: unknown,
  fastifyOptions?: unknown,
): Promise<NestFastifyApplication> => {
  const app = await NestFactory.create<NestFastifyApplication>(
    appModule,
    fastifyOptions
      ? new FastifyAdapter(fastifyOptions)
      : new FastifyAdapter(),
    { bufferLogs: true },
  );

  return app;
};

async function generateSwaggerDoc() {
  const app = await createApp(AppModule);

  const document = createSwagger(app);
  writeFileSync('./apps/backend/swagger.json', JSON.stringify(document), {
    encoding: 'utf8',
  });

  process.exit();
}

async function runApp() {
  const app = await createApp(AppModule, FASTIFY_OPTIONS);

  app.enableCors(
    Object.assign(CORS_OPTIONS, {
      origin: '*',
    }),
  );

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  await app.listen(3000, '0.0.0.0');
}

if (process.env.isGenSwagger) {
  generateSwaggerDoc();
} else{
  runApp();
}
