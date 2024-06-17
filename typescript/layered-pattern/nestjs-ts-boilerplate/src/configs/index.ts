import { httpConfig } from './http.config';
import { logConfig } from './log.config';
import { ormConfig } from './orm.config';

export const configs = {
  http: httpConfig,
  log: logConfig,
  orm: ormConfig,
};
