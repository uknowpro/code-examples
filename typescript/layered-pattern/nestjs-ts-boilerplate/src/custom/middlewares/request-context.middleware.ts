import { AsyncLocalStorage } from 'async_hooks';

import { Injectable, NestMiddleware, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

export class RequestContext<Request = any, Response = any> {
  static storage = new AsyncLocalStorage<RequestContext>();
  private static counter = 1;
  readonly id = RequestContext.counter++;

  static getCtx() {
    return this.storage.getStore();
  }

  constructor(
    public readonly req: Request,
    public readonly res: Response,
  ) {}
}

@Injectable()
class RequestContextMiddleware<Request = any, Response = any> implements NestMiddleware<Request, Response> {
  use(req: Request, res: Response, next: () => void) {
    RequestContext.storage.run(new RequestContext(req, res), next);
  }
}

@Module({
  providers: [RequestContextMiddleware],
  exports: [RequestContextMiddleware],
})
export class RequestContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
