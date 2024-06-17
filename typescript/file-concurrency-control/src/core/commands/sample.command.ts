import { CreateSampleDto, UpdateSampleDto } from '@core/dtos';
import { SampleEntity } from '@core/entities';

export interface CreateSampleCommand {
  execute(params: CreateSampleDto): Promise<SampleEntity>;
}

export interface UpdateSampleCommand {
  execute(id: string, params: UpdateSampleDto): Promise<SampleEntity>;
}

export interface DeleteSampleCommand {
  execute(id: string): Promise<null>;
}
