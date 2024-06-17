import { SwaggerRouter } from 'koa-swagger-decorator';

import { HealthHttpController } from './controllers';

const controllerRouter = new SwaggerRouter();

controllerRouter.get('/health', HealthHttpController.getHealth);

export { controllerRouter };
