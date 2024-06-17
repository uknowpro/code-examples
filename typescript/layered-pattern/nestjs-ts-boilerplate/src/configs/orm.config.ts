import { join } from 'path';

import { Options } from '@mikro-orm/core';
// import * as entities from '@core/entities';

const ENTITIES = Object.values([]);

const configs = {
  test: {},
  local: {
    entities: ENTITIES,
    dbName: process.env.DB_NAME || 'rdb',
    host: process.env.DB_MASTER_CLIENT_HOST || '0.0.0.0',
    type: 'mysql',
    port: process.env.DB_PORT || 8750,
    debug: true,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'local',
    pool: { min: 1, max: 2 },
    migrations: {
      tableName: 'migrations',
      path: `${join(process.cwd(), '/migrations')}`,
      glob: '!(*.d).{js,ts}',
      transactional: true,
      disableForeignKeys: false,
      allOrNothing: true,
      dropTables: true,
      fileName: (timestamp, name) => `${timestamp}_${name}`,
      safe: false,
      snapshot: true,
      emit: 'ts',
    },
    schemaGenerator: {
      createForeignKeyConstraints: true,
    },
    preferReadReplicas: true,
    replicas: [
      {
        name: 'slave',
        host: process.env.DB_SLAVE_CLIENT_HOST || '0.0.0.0',
      },
    ],
    seeder: {
      path: `${join(process.cwd(), '/migrations/seeders')}`,
      defaultSeeder: 'DatabaseSeeder',
      glob: '!(*.d).{js,ts}',
      emit: 'ts',
      fileName: (className: string) => className,
    },
  } as Options,
  development: {
    entities: ENTITIES,
    dbName: process.env.DB_NAME,
    host: process.env.DB_MASTER_CLIENT_HOST,
    type: 'mysql',
    port: process.env.DB_PORT,
    debug: true,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    pool: { min: 1, max: 2 },
    migrations: {
      tableName: 'migrations',
      path: `${join(process.cwd(), '/migrations')}`,
      glob: '!(*.d).{js,ts}',
      transactional: true,
      disableForeignKeys: false,
      allOrNothing: true,
      dropTables: true,
      fileName: (timestamp, name) => `${timestamp}_${name}`,
      safe: false,
      snapshot: true,
      emit: 'ts',
    },
    schemaGenerator: {
      createForeignKeyConstraints: true,
    },
    preferReadReplicas: true,
    replicas: [
      {
        name: 'slave',
        host: process.env.DB_SLAVE_CLIENT_HOST,
      },
    ],
    seeder: {
      path: `${join(process.cwd(), '/migrations/seeders')}`,
      defaultSeeder: 'DatabaseSeeder',
      glob: '!(*.d).{js,ts}',
      emit: 'ts',
      fileName: (className: string) => className,
    },
  } as Options,
  staging: {
    entities: ENTITIES,
    dbName: process.env.DB_NAME,
    host: process.env.DB_MASTER_CLIENT_HOST,
    type: 'mysql',
    port: process.env.DB_PORT,
    debug: false,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    pool: { min: 1, max: 10 },
    migrations: {
      tableName: 'migrations',
      path: `${join(process.cwd(), '/migrations')}`,
      glob: '!(*.d).{js,ts}',
      transactional: true,
      disableForeignKeys: false,
      allOrNothing: true,
      dropTables: false,
      fileName: (timestamp, name) => `${timestamp}_${name}`,
      safe: false,
      snapshot: true,
      emit: 'ts',
    },
    schemaGenerator: {
      createForeignKeyConstraints: true,
    },
    preferReadReplicas: true,
    replicas: [
      {
        name: 'slave',
        host: process.env.DB_SLAVE_CLIENT_HOST,
      },
    ],
    seeder: {
      path: `${join(process.cwd(), '/migrations/seeders')}`,
      defaultSeeder: 'DatabaseSeeder',
      glob: '!(*.d).{js,ts}',
      emit: 'ts',
      fileName: (className: string) => className,
    },
  } as Options,
  production: {
    entities: ENTITIES,
    dbName: process.env.DB_NAME,
    host: process.env.DB_MASTER_CLIENT_HOST,
    type: 'mysql',
    port: process.env.DB_PORT,
    debug: false,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    pool: { min: 1, max: 10 },
    migrations: {
      tableName: 'migrations',
      path: `${join(process.cwd(), '/migrations')}`,
      glob: '!(*.d).{js,ts}',
      transactional: true,
      disableForeignKeys: false,
      allOrNothing: true,
      dropTables: false,
      fileName: (timestamp, name) => `${timestamp}_${name}`,
      safe: false,
      snapshot: true,
      emit: 'ts',
    },
    schemaGenerator: {
      createForeignKeyConstraints: true,
    },
    preferReadReplicas: true,
    replicas: [
      {
        name: 'slave',
        host: process.env.DB_SLAVE_CLIENT_HOST,
      },
    ],
  } as Options,
};

export const ormConfig = configs[process.env.ENV || 'local'];
export default () => ormConfig;
