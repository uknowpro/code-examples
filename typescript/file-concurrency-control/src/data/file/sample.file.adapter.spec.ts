import { Test, TestingModule } from '@nestjs/testing';
import { JsonDB, Config } from 'node-json-db';
import { Mutex } from 'async-mutex';
import { SampleFileAdapter } from './sample.file.adapter';

describe('SampleFileAdapter', () => {
  let adapter: SampleFileAdapter;
  let jsonDBMock: JsonDB;
  let mutexMock: Mutex;

  beforeEach(async () => {
    jsonDBMock = new JsonDB(new Config('mock', false, false, '/'));
    mutexMock = new Mutex();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SampleFileAdapter,
        { provide: 'SampleFileDB', useValue: jsonDBMock },
        { provide: 'Mutex', useValue: mutexMock },
      ],
    }).compile();

    adapter = module.get<SampleFileAdapter>(SampleFileAdapter);
  });

  it('should create a sample', async () => {
    const name = 'Sample 1';
    const description = 'Description 1';

    const sample = await adapter.createSample(name, description);

    expect(sample).toBeDefined();
    expect(sample.id).toBeDefined();
    expect(sample.name).toBe(name);
    expect(sample.description).toBe(description);
  });

  it('should update a sample', async () => {
    const sample = await adapter.createSample('Sample 2', 'Description 2');

    const updatedName = 'Updated Sample';
    const updatedDescription = 'Updated Description';

    const updatedSample = await adapter.updateSample(
      sample.id,
      updatedName,
      updatedDescription,
    );

    expect(updatedSample).toBeDefined();
    expect(updatedSample.id).toBe(sample.id);
    expect(updatedSample.name).toBe(updatedName);
    expect(updatedSample.description).toBe(updatedDescription);
  });

  it('should acquire and release mutex properly', async () => {
    const release = await adapter['mutex'].acquire();

    expect(mutexMock.isLocked()).toBe(true);

    release();

    expect(mutexMock.isLocked()).toBe(false);
  });
});
