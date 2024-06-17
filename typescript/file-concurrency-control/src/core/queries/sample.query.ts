import { SampleEntity } from '../entities';

export interface GetSampleQuery {
  execute(id: string): Promise<SampleEntity>;
}

export interface ListSamplesQuery {
  execute(): Promise<SampleEntity[]>;
}
