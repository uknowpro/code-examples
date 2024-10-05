import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { configs } from '@configs';
import { LoadStrategy } from '@mikro-orm/core';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => ({
        ...configs.orm,
        allowGlobalContext: false, // Since v5, it is no longer possible to use the global identity map. This was a common issue that led to weird bugs
        loadStrategy: LoadStrategy.SELECT_IN,
        registerRequestContext: false,
      }),
      inject: [],
      contextName: 'default',
      // scope: Scope.REQUEST,
    }),
    MikroOrmModule.forMiddleware()
  ],
  controllers: [],
  providers: [],
})

export class OrmModule {} // implemented onApplicationShutdown in MikroOrmCoreModule but disabled in app
