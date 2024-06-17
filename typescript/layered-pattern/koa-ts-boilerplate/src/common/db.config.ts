import { join } from 'path';
import { Options } from '@mikro-orm/core';

import * as entities from '../core/entities';

const configs = {
  local: {
    entities: Object.values(entities),
    dbName: process.env.DB_NAME || 'local',
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
  } as Options,
  development: {
    entities: Object.values(entities),
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
  } as Options,
  staging: {
    entities: Object.values(entities),
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
  production: {
    entities: Object.values(entities),
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

const config = configs[process.env.NODE_ENV || 'local'];
export const dbConfig = config;
