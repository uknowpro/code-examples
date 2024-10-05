import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

import * as entities from '@core/entities';

const connect = process.env.isGenSwagger ? false : true;
const extensions = [Migrator];
// if (process.env.NODE_ENV === 'local') {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const { SeedManager } = require('@mikro-orm/seeder');
//   extensions.push(SeedManager);
// }

const ENTITIES = Object.values(entities);
const migrations = {
  tableName: 'mikro_orm_migrations', // migrations table name
  path: './apps/backend/migrations', // path to folder with migration files
  glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
  transactional: true, // run each migration inside transaction
  disableForeignKeys: false, // try to disable foreign_key_checks (or equivalent)
  allOrNothing: true, // run all migrations in current batch in master transaction
  emit: 'ts', // migration generation mode
  dropTables: true,
  snapshot: true,
  fileName: (timestamp, name) => `${timestamp}_${name}`,
};

// const seeder = {
//   path: `./apps/backend/migrations/seeders`,
//   defaultSeeder: 'DatabaseSeeder',
//   glob: '!(*.d).{js,ts}',
//   emit: 'ts',
//   fileName: (className: string) => className,
// }

const defaultConfig = {
  entities: ENTITIES,
  clientUrl: process.env.DATABASE_MASTER_URL || 'mysql://username:password@localhost:3306/letter',
  schema: 'earnings',
  driver: PostgreSqlDriver,
  schemaGenerator: {
    createForeignKeyConstraints: true,
  },
  // preferReadReplicas: true,
  // replicas: [
  //   {
  //     name: 'replica',
  //     clientUrl: process.env.DATABASE_REPLICA_URL,
  //   },
  // ],
  connect,
  migrations,
  extensions,
  // seeder,
}

const configs = {
  local: {
    ...defaultConfig,
    debug: true,
    pool: {
      min: 2,
      max: 10,
      // idleTimeoutMillis: 30000, // 사용되지 않는 연결이 풀에서 제거되기 전까지의 유휴 시간(밀리초)
      // reapIntervalMillis: 10000, // 유휴 연결을 정리하는 간격
      // createTimeoutMillis: 30000, // 새로운 연결을 생성할 때의 타임아웃 시간
      // acquireTimeoutMillis: 30000, // 연결 풀에서 연결을 획득할 때의 타임아웃 시간
      // propagateCreateError: false, // 새 연결 생성 시 에러를 풀(pool)에 전파할지 여부
    },
    acquireConnectionTimeout: 60000, // 연결 획득 시 전체 타임아웃 시간
    // driverOptions: {
    //   connection: {
    //     keepAlive: true,
    //   },
    // },
  } as Options,
  prod: {
    ...defaultConfig,
    debug: false,
    pool: { min: 2, max: 10 },
  } as Options,
};

export default configs[process.env.STAGE || 'local'];
