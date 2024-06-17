import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestContext } from './request-context.class';

@Injectable()
export class RequestContextMiddleware<Request = any, Response = any>
  implements NestMiddleware<Request, Response>
{
  use(req: Request, res: Response, next: () => void) {
    RequestContext.storage.run(new RequestContext(req, res), next);
  }
}
