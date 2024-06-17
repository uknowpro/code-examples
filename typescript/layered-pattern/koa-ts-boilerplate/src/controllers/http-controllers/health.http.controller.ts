import { BaseContext } from 'koa';
import { request, tagsAll } from 'koa-swagger-decorator';

import { getHealthService } from '../../services';

@tagsAll(['Health'])
export class HealthHttpController {
  @request('get', '/health')
  public static async getHealth(ctx: BaseContext): Promise<undefined> {
    const health = await getHealthService.health();
    Object.assign(ctx, {
      status: 204,
      body: health,
    });
  }
}
