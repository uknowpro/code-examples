import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  MikroOrmHealthIndicator,
} from '@nestjs/terminus';
import { EntityManager } from '@mikro-orm/postgresql';
import { InjectEntityManager } from '@mikro-orm/nestjs';

@ApiExcludeController()
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,

    private readonly mikroOrmHealthIndicator: MikroOrmHealthIndicator,

    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return await this.health.check([
      () => this.mikroOrmHealthIndicator.pingCheck('earnings-letter-pg', {
        connection: this.em.getConnection(),
      }),
    ]);
  }
}
