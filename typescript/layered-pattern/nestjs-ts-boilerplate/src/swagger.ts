import { writeFileSync } from 'fs';

import { fastify } from 'fastify';

import { createApp, createSwagger } from './bootstrap';
import { AppModule } from './app.module';

export const generateDoc = async (): Promise<void> => {
  const instance = fastify();
  const app = await createApp(AppModule, undefined, instance);
  const document = createSwagger(app);

  writeFileSync('swagger.json', JSON.stringify(document), {
    encoding: 'utf8',
  });

  await app.close();
};

generateDoc();
