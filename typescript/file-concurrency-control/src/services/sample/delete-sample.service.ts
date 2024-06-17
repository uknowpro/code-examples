import { Inject } from '@nestjs/common';

import { DeleteSamplePort } from '@core/ports';
import { DeleteSampleCommand } from '@core/commands';

export class DeleteSampleService implements DeleteSampleCommand {
  constructor(
    @Inject('DeleteSamplePort')
    private readonly deleteSamplePort: DeleteSamplePort,
  ) {}

  async execute(id: string): Promise<null> {
    await this.deleteSamplePort.deleteSample(id);
    return null;
  }
}
