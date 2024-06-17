import { Inject, Injectable } from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { Mutex } from 'async-mutex';

import { SampleEntity } from '@core/entities';
import {
  CreateSamplePort,
  UpdateSamplePort,
  DeleteSamplePort,
  GetSamplePort,
  ListSamplePort,
} from '@core/ports';

@Injectable()
export class SampleFileAdapter
  implements
    CreateSamplePort,
    UpdateSamplePort,
    DeleteSamplePort,
    GetSamplePort,
    ListSamplePort
{
  private tableName: string;

  constructor(
    @Inject('SampleFileDB')
    private readonly db: JsonDB,

    @Inject('Mutex')
    private readonly mutex: Mutex,
  ) {
    this.tableName = 'sample';
  }

  async createSample(name: string, description: string): Promise<SampleEntity> {
    const release = await this.mutex.acquire();
    try {
      const id = uuidv4();
      const sample = {
        id,
        name,
        description,
      };
      await this.db.push(`${this.tableName}/${id}`, sample);
      await this.db.save();
      return sample;
    } finally {
      release();
    }
  }

  async updateSample(
    id: string,
    name: string,
    description: string,
  ): Promise<any | SampleEntity> {
    // if not exist, throw not found error
    const release = await this.mutex.acquire();
    try {
      const sample = {
        id,
        name,
        description,
      };
      await this.db.push(`${this.tableName}/${id}`, sample);
      await this.db.save();
      return sample;
    } finally {
      release();
    }
  }

  async deleteSample(id: string): Promise<null> {
    // if not exist, throw not found error
    const release = await this.mutex.acquire();
    try {
      await this.db.delete(`${this.tableName}/${this.tableName}/${id}`);
      await this.db.save();
      return null;
    } finally {
      release();
    }
  }

  async getSample(id: string): Promise<any | SampleEntity> {
    // if not exist, throw not found error
    const sample = this.db.getData(`${this.tableName}/${id}`);
    return sample;
  }

  async listSamples(): Promise<SampleEntity[]> {
    const samples = this.db.getData(`${this.tableName}`);
    return samples ?? [];
  }
}
