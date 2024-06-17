import * as dotenv from 'dotenv';

dotenv.config();

const configs = {
  test: {},
  local: {
    isColorEnabled: true,
    levels: 'debug',
  },
  development: {
    isColorEnabled: false,
    levels: 'debug',
  },
  staging: {
    isColorEnabled: false,
    levels: 'debug',
  },
  production: {
    env: 'production',
    isColorEnabled: false,
    levels: 'error',
  },
};

export const logConfig = configs[process.env.ENV || 'local'];
