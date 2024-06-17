import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import winston from 'winston';
import 'reflect-metadata';

import { logger } from './common';
import { config } from './common';
import { controllerRouter } from './routes';

async function bootstrap() {
  const app = new Koa();

  // Provides important security headers to make your app more secure
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com', 'fonts.googleapis.com'],
        fontSrc: ["'self'", 'fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'online.swagger.io', 'validator.swagger.io'],
      },
    }),
  );

  app.use(cors());

  app.use(logger(winston));

  app.use(bodyParser());

  app.use(controllerRouter.routes()).use(controllerRouter.allowedMethods());

  await app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

bootstrap();
