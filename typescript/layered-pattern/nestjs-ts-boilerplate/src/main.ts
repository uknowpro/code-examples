import lodash from 'lodash';

import { createApp } from './bootstrap';
import { AppModule } from './app.module';

import { configs } from '@configs';
import { GlobalValidationPipe } from '@custom/pipes';

const FASTIFY_OPTIONS = {
  connectionTimeout: 0, // default no limit
  keepAliveTimeout: 7200, // default 72 seconds
  maxRequestsPerSocket: 0, // default no limit
  requestTimeout: 0, // default no limit
  disableRequestLogging: true, // default false
};

const CORS_OPTIONS = {
  origin: ['*'],
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Content-Type',
    'Authorization',
    'X-Forwarded-For',
    'X-Request-Id',
  ],
  exposedHeaders: 'Authorization',
  credentials: true,
  methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
};

async function runApp() {
  const app = await createApp(AppModule, FASTIFY_OPTIONS);

  app.enableCors(
    lodash.merge(CORS_OPTIONS, {
      origin: configs.http.corsWhiteList,
    }),
  );

  app.useGlobalPipes(new GlobalValidationPipe());

  app.enableShutdownHooks();

  await app.listen(lodash.get(configs.http, 'listenPort', 5000), '0.0.0.0');
}

runApp();
