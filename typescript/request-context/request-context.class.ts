import { AsyncLocalStorage } from 'async_hooks';

export class RequestContext<Request = any, Response = any> {
  static storage = new AsyncLocalStorage<RequestContext>();
  private static counter = 1;
  readonly id = RequestContext.counter++;

  static getCtx() {
    return this.storage.getStore();
  }

  constructor(public readonly req: Request, public readonly res: Response) {}
}
