import { Inject } from '@nestjs/common';

import { SampleEntity } from '@core/entities';
import { GetSampleQuery } from '@core/queries';
import { GetSamplePort } from '@core/ports';

export class GetSampleService implements GetSampleQuery {
  constructor(
    @Inject('GetSamplePort')
    private readonly getSamplePort: GetSamplePort,
  ) {}

  async execute(id: string): Promise<any | SampleEntity> {
    const sample = await this.getSamplePort.getSample(id);
    return sample;
  }
}
