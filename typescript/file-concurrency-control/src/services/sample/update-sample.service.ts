import { Inject } from '@nestjs/common';

import { UpdateSamplePort } from '@core/ports';
import { UpdateSampleCommand } from '@core/commands';
import { UpdateSampleDto } from '@core/dtos';
import { SampleEntity } from '@core/entities';

export class UpdateSampleService implements UpdateSampleCommand {
  constructor(
    @Inject('ListSamplePort')
    private readonly updateSamplePort: UpdateSamplePort,
  ) {}

  async execute(id: string, param: UpdateSampleDto): Promise<SampleEntity> {
    const sample = await this.updateSamplePort.updateSample(
      id,
      param.name,
      param.description,
    );
    return sample;
  }
}
