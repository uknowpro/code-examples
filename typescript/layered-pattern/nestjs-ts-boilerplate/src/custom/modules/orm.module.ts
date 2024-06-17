import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { configs } from '@configs';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => ({
        entities: configs.orm.entities,
        type: configs.orm.type,
        dbName: configs.orm.dbName,
        host: configs.orm.host,
        port: configs.orm.port,
        debug: configs.orm.debug,
        user: configs.orm.user,
        password: configs.orm.password,
        pool: configs.orm.pool,
        preferReadReplicas: configs.orm.preferReadReplicas,
        replicas: configs.orm.replicas,
        allowGlobalContext: false, // Since v5, it is no longer possible to use the global identity map. This was a common issue that led to weird bugs
      }),
      inject: [],
    }),
  ],
  controllers: [],
  providers: [],
})
export class OrmModule {}
