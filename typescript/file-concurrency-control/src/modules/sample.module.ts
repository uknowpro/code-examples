import { Module } from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';
import { Mutex } from 'async-mutex';

import { SampleWebController } from '@controllers';
import {
  GetSampleService,
  ListSampleService,
  CreateSampleService,
  UpdateSampleService,
  DeleteSampleService,
} from '@services/sample';
import { SampleFileAdapter } from '@data';
import { dbName } from '@configs/db';

@Module({
  imports: [],
  controllers: [SampleWebController],
  providers: [
    {
      provide: 'SampleFileDB',
      useFactory: () => {
        return new JsonDB(new Config(dbName, false, false, '/'));
      },
    },
    {
      provide: 'Mutex',
      useFactory: () => {
        return new Mutex();
      },
    },

    {
      provide: 'GetSampleQuery',
      useClass: GetSampleService,
    },
    {
      provide: 'ListSamplesQuery',
      useClass: ListSampleService,
    },

    {
      provide: 'CreateSampleCommand',
      useClass: CreateSampleService,
    },
    {
      provide: 'UpdateSampleCommand',
      useClass: UpdateSampleService,
    },
    {
      provide: 'DeleteSampleCommand',
      useClass: DeleteSampleService,
    },

    {
      provide: 'CreateSamplePort',
      useClass: SampleFileAdapter,
    },
    {
      provide: 'GetSamplePort',
      useClass: SampleFileAdapter,
    },
    {
      provide: 'ListSamplePort',
      useClass: SampleFileAdapter,
    },
    {
      provide: 'UpdateSamplePort',
      useClass: SampleFileAdapter,
    },
    {
      provide: 'DeleteSamplePort',
      useClass: SampleFileAdapter,
    },
  ],
})
export class SampleModule {}
