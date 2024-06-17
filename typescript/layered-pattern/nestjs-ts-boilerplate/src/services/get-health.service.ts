import { Injectable } from '@nestjs/common';

import { GetHealthQuery } from '@core/queries';

@Injectable()
export class GetHealthService implements GetHealthQuery {
  async health(): Promise<undefined> {
    return;
  }
}
