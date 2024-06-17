import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as winston from 'winston';

import { configs } from '@configs';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  // "extends Logger" instruction is not allowed in Nest v9. Please, use "extends ConsoleLogger" instead.
  private readonly logger: winston.Logger;

  constructor() {
    super();
    this.logger = winston.createLogger({
      level: configs.log.levels,
      format: winston.format.simple(),
      transports: [new winston.transports.Console()],
    });
  }

  error(message: string, optionalParams?: any) {
    this.logger.error(message, optionalParams);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  log(message: string) {
    this.logger.info(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
