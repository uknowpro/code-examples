import { Inject } from '@nestjs/common';

import { SampleEntity } from '@core/entities';
import { ListSamplesQuery } from '@core/queries';
import { ListSamplePort } from '@core/ports';

export class ListSampleService implements ListSamplesQuery {
  constructor(
    @Inject('ListSamplePort')
    private readonly listSamplesPort: ListSamplePort,
  ) {}

  async execute(): Promise<SampleEntity[]> {
    const samples = await this.listSamplesPort.listSamples();
    return samples;
  }
}
