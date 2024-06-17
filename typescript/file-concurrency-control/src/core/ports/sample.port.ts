import { SampleEntity } from '../entities';

export interface CreateSamplePort {
  createSample(name: string, description: string): Promise<SampleEntity>;
}

export interface UpdateSamplePort {
  updateSample(
    id: string,
    name: string,
    description: string,
  ): Promise<SampleEntity>;
}

export interface DeleteSamplePort {
  deleteSample(id: string): Promise<null>;
}

export interface GetSamplePort {
  getSample(id: string): Promise<SampleEntity>;
}

export interface ListSamplePort {
  listSamples(): Promise<SampleEntity[]>;
}
