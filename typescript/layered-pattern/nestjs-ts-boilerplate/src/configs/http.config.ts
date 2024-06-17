import * as dotenv from 'dotenv';

dotenv.config();

const configs = {
  test: {},
  local: {
    corsWhiteList: ['*'],
    reqTimeoutSeconds: 15,
    listenPort: process.env.LISTEN_PORT,
  },
  development: {
    corsWhiteList: ['*'],
    reqTimeoutSeconds: 15,
    listenPort: process.env.LISTEN_PORT,
  },
  production: {
    corsWhiteList: ['*'],
    reqTimeoutSeconds: 15,
    listenPort: process.env.LISTEN_PORT,
  },
};

export const httpConfig = configs[process.env.ENV || 'local'];
