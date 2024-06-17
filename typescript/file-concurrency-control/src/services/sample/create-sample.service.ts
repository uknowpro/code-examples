import { Inject } from '@nestjs/common';

import { CreateSamplePort } from '@core/ports';
import { CreateSampleCommand } from '@core/commands';
import { CreateSampleDto } from '@core/dtos';
import { SampleEntity } from '@core/entities';

export class CreateSampleService implements CreateSampleCommand {
  constructor(
    @Inject('CreateSamplePort')
    private readonly createSamplePort: CreateSamplePort,
  ) {}

  async execute(param: CreateSampleDto): Promise<SampleEntity> {
    const sample = await this.createSamplePort.createSample(
      param.name,
      param.description,
    );
    return sample;
  }
}
