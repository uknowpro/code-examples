import dotenv from 'dotenv';

const ENV_FILE_PATH = process.env.NODE_ENV == 'local' ? '.local_env' : '.env';

dotenv.config({ path: ENV_FILE_PATH });

export interface Config {
  port: number;
  debugLogging: boolean;
}

const isDevMode = process.env.NODE_ENV == 'development';

const config: Config = {
  port: +(process.env.PORT || 3000),
  debugLogging: isDevMode,
};

export { config };
